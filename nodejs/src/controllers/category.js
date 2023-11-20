import Category from "../modles/category";
import { categorySchema } from "../validate/category";



export const create = async (req, res) => {
    try {
        const { error } = categorySchema.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(404).json({
                errors: errors
            })
        }
        const data = await Category.create(req.body);
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không thêm được danh mục",
            });
        }
        return res.status(200).json({
            message: "Thêm danh mục thành công",
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
        const data = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (data.length === 0) {
            return res.status(200).json({
                message: "Cập nhật danh muc không thành công",
            });
        }
        return res.status(200).json({
            message: "Cập nhật danh muc thành công",
            data,
        });
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

export const getOne = async (req, res) => {
    try {

        const data = await Category.findById(req.params.id);
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu",
            });
        }
        return res.json(data);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });

    }
}
export const remove = async (req, res) => {
    try {
        const data = await Category.findByIdAndDelete({ _id: req.params.id })
        return res.status(201).json({
            message: "Xóa sản phẩm thành công"
        })
    } catch (error) {
        return res.status(400).json({
        })
    }
}


export const getAll = async (req, res) => {
    try {
        const data = await Category.find();
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu",
            });
        }
        return res.status(200).json({
            message: "Danh sách All",
            data,
        });
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

