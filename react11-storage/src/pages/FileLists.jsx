import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { storage } from '../storageConfig';
import { ref, listAll, getMetadata } from 'firebase/storage';

const FileLists = () => {
  const [fileLists, setFileLists] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const listRef = ref(storage, 'files');
    listAll(listRef)
      .then((res) => Promise.all(
        res.items.map((itemRef) =>
          getMetadata(itemRef).then((meta) => ({
            name: itemRef.name,
            fullPath: itemRef.fullPath,
            size: meta.size,
            contentType: meta.contentType,
          }))
        )
      ))
      .then((rows) => {
        setFileLists(rows);
        setErrorMsg('');
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg('파일 목록을 불러오지 못했습니다.');
      });
  }, []);

  return (
    <>
      <h2>Firebase Storage - 파일 목록</h2>
      {errorMsg && <p>{errorMsg}</p>}
      <table border="1">
        <thead>
          <tr>
            <th>파일명</th>
            <th>경로</th>
            <th>크기</th>
            <th>상세</th>
          </tr>
        </thead>
        <tbody>
          {fileLists.length === 0 ? (
            <tr>
              <td colSpan="4">업로드된 파일이 없습니다.</td>
            </tr>
          ) : fileLists.map((file) => (
            <tr key={file.fullPath}>
              <td>{file.name}</td>
              <td>{file.fullPath}</td>
              <td>{file.size}</td>
              <td>
                <NavLink to={`/filelists/${encodeURIComponent(file.fullPath)}`}>[보기]</NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FileLists;
