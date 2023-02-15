import { Request, Response } from "express";
import { cloudinary } from "../../services/cloudinary";
exports.Upload = async (req: any, res: any)=> {
  if (req.file) {
    const file = req.file.buffer;
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          public_id: req.file.filename,
          overwrite: true,
        },
        (error: any, result: any) => {
          if (error) {
            console.log(error);
            return res
              .status(500)
              .json({ message: "Erro ao fazer upload da imagem." });
          }
          return res.status(200).json({ url: result.secure_url });
        }
      )
      .end(file);
  } else {
    res.json("Erro ao fazer o upload");
  }
};
