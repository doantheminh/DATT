import Product from "../modles/product";
import Category from "../modles/category";
import { productSchema } from "../validate/product";


export const create = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(404).json({
                errors: errors
            })
        }
        const data = await Product.create(req.body);
        await Category.findByIdAndUpdate(data.categoryId, {
            $addToSet: {
                products: data._id,
            },
        });
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không thêm được sản phẩm",
            });
        }
        return res.status(200).json({
            message: "Thêm sản phẩm thành công",
            data,
        });


    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });

    }
}

export const getAll = async (req, res) => {
    try {

        const data = await Product.find();
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu",
            });
        }
        return res.status(200).json({
            message: "Danh sách sản phẩm",
            data,
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });

    }
}


export const getOne = async (req, res) => {
    try {

        const data = await Product.findById(req.params.id).populate("categoryId");
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu",
            });
        }
        return res.status(200).json({
            message: "Danh sách one",
            data,
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });

    }
}

export const update = async (req, res) => {
    try {

        const data = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (data.length === 0) {
            return res.status(200).json({
                message: "Cập nhật sản phẩm không thành công",
            });
        }
        return res.status(200).json({
            message: "Cập nhật sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

export const remove = async (req, res) => {
    try {
        const data = await Product.findByIdAndDelete({ _id: req.params.id })
        return res.status(201).json({
            message: "Xóa sản phẩm thành công"
        })
    } catch (error) {
        return res.status(400).json({
        })
    }
}


