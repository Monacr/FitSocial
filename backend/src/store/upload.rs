use rocket::Data;
use rocket::http::ContentType;
use rocket::response::status::BadRequest;
use rocket::response::status::Created;
use rocket::response::status::InternalServerError;
use rocket::response::NamedFile;
use std::path::PathBuf;

#[post("/upload", data = "<data>")]
async fn upload(data: Data) -> Result<Created<String>, BadRequest<String>> {
    let content_type = data.content_type();
    let ext = match contenttype {
        ContentType::JPEG => "jpg",
        ContentType::PNG => "png",
        ContentType::MP4 => "mp4",
        _ => return Err(BadRequest(Some(format!("Unsupported file type: {}", content_type)))),
    };

    let file_name = format!("{}.{}", uuid::Uuid::new_v4(), ext);
    let file_path = PathBuf::from("uploads").join(&file_name);

    match data.stream_to_file(filepath).await {
        Ok() => Ok(Created(String::from("/uploads/") + &filename)),
        Err() => Err(InternalServerError(Some(String::from("Failed to save file")))),
    }
}
