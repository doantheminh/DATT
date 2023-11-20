import Auth from "../modles/auth";
import bcrypt from "bcryptjs";
import { signinSchema, signupSchema } from "../validate/auth";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(404).json({
                errors: errors
            })
        }
        const checkEmail = await Auth.findOne({ email: req.body.email })
        if (checkEmail) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            })
        }

        const checkPass = await bcrypt.hash(req.body.password, 10)
        const user = await Auth.create({
            name: req.body.name,
            email: req.body.email,
            password: checkPass,
        })

        user.password = undefined

        const token = jwt.sign({ id: user.id }, "123456", { expiresIn: "7d" })

        return res.status(200).json({
            message: "Tạo tài khoản thành công",
            accessToken: token,
            user
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = signinSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const user = await Auth.findOne({ email })
        if (!user) {

            return res.status(400).json({
                message: "Email không tồn tại"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không đúng"
            })
        }
        const token = jwt.sign({ id: user.id }, "123456", { expiresIn: "1d" })
        user.password = undefined
        return res.status(200).json({
            message: "Đăng nhập thành công",
            user,
            token
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message,
        })
    }
}