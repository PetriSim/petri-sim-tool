import React, { useState } from 'react';

function FileUploader() {
  const [data, setData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileData = event.target.result;
      const parsedData = JSON.parse(fileData);
      setData(parsedData);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" name="file" onChange={handleFileChange} />
      
      {data && (
        <div>
          {Object.keys(data).map((key) => (
            <div key={key}>{`${key}: ${data[key]}`}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUploader;
