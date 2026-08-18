import { useState } from "react";
import { storage } from "../storageConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FileUpload = () => {
  //스토리지 연결 및 경로설정 
  const imageRef = ref(storage, "images/myFile.jpg");
  /**
  앞에서 얻어온 참조값을 통해 폴더 및 파일명에 접근할 수 있다. parent, root 속성으로 한단계 상위, 최상위 경로를 
  표현할 수 있다.
   */
  console.log('경로/파일명', imageRef.fullPath, imageRef.name);
  console.log('parent경로', imageRef.parent.fullPath);
  console.log('root경로', imageRef.root.fullPath);

  //폴더명 입력 상태 관리
  const [folder, setFolder] = useState('');
  /**
  폴더명이 입력되지 않은 경우에는 최상위 경로를 설정하고, 폴더명이 입력된 경우에는 하위 경로를 설정한다.
   */
  const storageRef = folder === '' ? ref(storage) : ref(storage, folder);

  return (
    <>
      <h2>Storage - 업로드</h2>
      <p>파일을 선택하면 즉시 업로드 됩니다.</p>
      폴더명 : <input type="text" value={folder} onChange={(e) => setFolder(e.target.value)} /> <br />
      <input type="file" name="myFile" onChange={(e) => {
        const file = e.target.files[0];
        if (!file) return;
        const uploadRef = ref(storageRef, file.name);
        uploadBytes(uploadRef, file).then((snapshot) => {
          console.log('업로드 성공', snapshot);
          return getDownloadURL(snapshot.ref);
        }).then((url) => {
          console.log('다운로드 URL', url);
          alert('업로드 성공');
          e.target.value = '';
        }).catch((err) => {
          console.error(err);
          alert('업로드에 실패했습니다.');
        });
      }} />
    </>
  );
}

export default FileUpload;
