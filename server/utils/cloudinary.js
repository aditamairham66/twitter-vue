import { v2 as _cloudinaryResolve } from "cloudinary";

const cloudinary = () => {
    const config = useRuntimeConfig()

    _cloudinaryResolve.config({
        cloud_name: config.cloudinaryName,
        api_key: config.cloudinaryKey,
        api_secret: config.cloudinarySecret,
        // secure: true
    })

    return _cloudinaryResolve
}

export const uploadFile = (fileUpload) => {
    return new Promise((resolve, reject) => {
        cloudinary().uploader.upload(fileUpload, (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(data)
        })
    })
}