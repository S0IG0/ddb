import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";

function Upload() {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setSelectedFiles(filesArray);
        }
    };

    const handleUpload = async (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post('http://localhost/api/upload/', formData);

            if (response.status === 200) {
                console.log('Files uploaded successfully');
                // Дополнительная логика по успешной загрузке файлов
            } else {
                console.error('Error uploading files');
                // Дополнительная логика по ошибке загрузки файлов
            }
        } catch (error) {
            console.error('An error occurred', error);
            // Дополнительная логика по обработке ошибки запроса
        }
    };

    return (
        <div className="col-md-6">
            <h2>Загрузка данных</h2>
            <form onSubmit={handleUpload}>
                <div className="mb-3">
                    <label htmlFor="fileInput" className="form-label">Выберите файлы</label>
                    <input
                        type="file"
                        className="form-control"
                        id="fileInput"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Загрузить</button>
            </form>
        </div>
    );
}

export default Upload;