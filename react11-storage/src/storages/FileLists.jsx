import { storage } from "../storageConfig";
import { ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

const FileLists = () => {
  //라우팅 처리에서 :path로 지정된 변수로 이미지 경로가 전달된다. 
  let params = useParams();
  //이미지 경로에 따라 스토리지의 참조변수를 생성한다. 
  let paramspath = params.path === undefined ? "" : params.path;
  /**
  root 경로 -> ref(storage,'')
  imgs 경로 -> ref(storage,'imgs')이와 같이 참조를 생성
   */
  const myPathRef = ref(storage, paramspath);

  //상태변수 생성. 파일목록 및 리랜더링을 위한 변수 생성. 
  const [filesLists, setFilesLists] = useState([]);
  const [renderFlag, setRenderFlag] = useState(false);

  useEffect(() => {
    let fileRows = [];
    //현재 경로의 폴더 및 파일 목록을 조회한다. 
    listAll(myPathRef)
      .then((res) => {
        //root 경로의 폴더 목록을 조회한다. 
        res.prefixes.forEach((folderRef) => {
          fileRows.push(
            //폴더의 이름 및 링크 생성 
            <tr key={folderRef.name}>
              <td>
                <NavLink to={`/filelists/${folderRef.name}`}>{folderRef.name}</NavLink>
              </td>
              <td></td>
              <td colSpan={2}>폴더명</td>
            </tr>
          );
        });
        //파일의 목록 출력 
        res.items.forEach((itemRef) => {
          //전체 경로를 이용해서 삭제를 위한 참조를 생성한다. 
          const deleteRef = ref(storage, itemRef.fullPath);
          //저장된 파일명을 통해 이지미의 경로를 얻어온다. 
          getDownloadURL(ref(myPathRef, itemRef.name))
            .then((url) => {
              //이미지명ㅇ르ㅗ 생성한 id속성을 <img> 태그에 설정한다. 
              const img = document.getElementById(`img${itemRef.name}`);
              console.log("URL", url);
              //src 속성에 이미지 경로를 설정한다. 
              img.setAttribute("src", url);
              //이미지 너비를 100px로 설정한다. 
              img.setAttribute("width", "100px");
            })
            .catch((error) => {
              console.log("이미지 다운로드 중 에러 발생", error);
            });
          fileRows.push(
            <tr key={itemRef.name}>
              {/* 이미지의 전체 경로 출력 */}
              <td>{myPathRef.fullPath}</td>
              {/* 이미지 출력 */}
              <td>
                <img id={`img${itemRef.name}`} alt={itemRef.name} />
              </td>
              <td>{itemRef.name}</td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("정말 삭제하시겠습니까?")) {
                      //앞에서 생성한 파일 삭제를 위한 참조로 삭제처리 
                      deleteObject(deleteRef)
                        .then(() => {
                          console.log("삭제 성공");
                          //파일이 삭제되면 화면을 리랜더링 
                          setRenderFlag((prev) => !prev);
                        })
                        .catch((error) => {
                          console.log("삭제 중 에러 발생", error);
                        });
                    }
              }}>삭제</button></td>
            </tr>
          );
        });
        //상태 변경 및 리랜더링(목록이 업데이트 됨) 
        setFilesLists(fileRows);
      })
      .catch((error) => {
        console.log("파일목록 조회 중 에러 발생", error);
      });
  }, [renderFlag, paramspath]);
  /**
  상태변수 renderFlag가 변경되거나, 일반변수 paramspath가 변경되면 useEffect()훅을
  재실행 하도록 의존성 배열을 설정한다. 
   */

  return (
    <>
      <h2>Storage - 파일목록</h2>
      <p>현재 경로: {myPathRef.fullPath}</p>
      <table border={1}>
        <tbody>
          <tr>
            <th>경로</th>
            <th>이미지</th>
            <th colSpan={2}>파일명</th>
          </tr>
          {filesLists}
        </tbody>
      </table>
    </>
  );
};

export default FileLists;
