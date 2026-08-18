import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { storage } from '../storageConfig';
import { ref, getDownloadURL, getMetadata, deleteObject } from 'firebase/storage';

const FileDetail = () => {
  const { path } = useParams();
  const navigate = useNavigate();
  const fullPath = decodeURIComponent(path || '');
  const [fileInfo, setFileInfo] = useState(null);

  useEffect(() => {
    if (!fullPath) return;
    const fileRef = ref(storage, fullPath);
    Promise.all([getMetadata(fileRef), getDownloadURL(fileRef)])
      .then(([meta, url]) => {
        setFileInfo({
          name: meta.name,
          fullPath: meta.fullPath,
          size: meta.size,
          contentType: meta.contentType,
          timeCreated: meta.timeCreated,
          url,
        });
      })
      .catch((err) => {
        console.error(err);
        alert('파일 정보를 불러오지 못했습니다.');
        navigate('/filelists');
      });
  }, [fullPath, navigate]);

  const deleteFile = () => {
    if (!window.confirm('삭제할까요?')) return;
    deleteObject(ref(storage, fullPath))
      .then(() => {
        alert('삭제되었습니다.');
        navigate('/filelists');
      })
      .catch((err) => {
        console.error(err);
        alert('삭제에 실패했습니다.');
      });
  };

  if (!fileInfo) return <p>로딩중...</p>;

  const isImage = (fileInfo.contentType || '').startsWith('image/');

  return (
    <>
      <h2>파일 상세보기</h2>
      <ul>
        <li>파일명 : {fileInfo.name}</li>
        <li>경로 : {fileInfo.fullPath}</li>
        <li>크기 : {fileInfo.size}</li>
        <li>타입 : {fileInfo.contentType}</li>
        <li>생성일 : {fileInfo.timeCreated}</li>
      </ul>
      {isImage && (
        <p>
          <img src={fileInfo.url} alt={fileInfo.name} style={{ maxWidth: '400px' }} />
        </p>
      )}
      <p><a href={fileInfo.url} target="_blank" rel="noreferrer">다운로드</a></p>
      <button type="button" onClick={deleteFile}>삭제</button>
    </>
  );
};

export default FileDetail;
