import { useState } from "react";
import style from "./App.module.less";
import picture from "./assets/국립현대미술관.jpeg";
import logo from "./assets/logo.jpg";
import { FaCheck } from "react-icons/fa";
import axios from "axios";

// 전시실 이미지
import seoulImage from "./assets/서울.jpg";
import gwacheonImage from "./assets/과천.jpg";
import deoksugungImage from "./assets/덕수궁.jpg";
import cheongjuImage from "./assets/청주.png";

// 전시실 혼잡도 데이터 인터페이스
interface CrowdData {
  resultCode: string; //API 호출 결과 상태 코드
  resultMsg: string; // API 호출 겨로가에 대한 상태 메시지
  totalCount: number; // API 응답에 포함된 데이터의 총 개수
  data: {
    congestionNm: string; // 전시실의 혼잡도
    agncNm: string; // 전시실을 관리하는 기관
    spaceNm: string; // 혼잡도 정보가 제공되는 툭정 전시실실
  };
}

function App() {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  const myServiceKey = import.meta.env.VITE_SERVICE_KEY;
  const myServiceURL = "http://apis.data.go.kr/1371033/mmcadensity/congestion";

  const [currentImage, setCurrentImage] = useState<string>(picture); // 현재 이미지 상태
  const [crowdData, setCrowdData] = useState<CrowdData | null>(null); // 혼잡도 데이터
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null); // 선택된 전시실
  const [resultVisible, setResultVisible] = useState<boolean>(false); // 결과 박스의 표시 여부

  const getCrowdData = async (spacecode: string) => {
    try {
      const response = await axios.get(myServiceURL, {
        params: {
          serviceKey: myServiceKey,
          spaceCode: spacecode, // 여기서 spaceCode가 올바르게 전달됩니다.
        },
      });

      console.log("API Response:", response); // 응답 확인

      // 응답 데이터가 존재하는지 확인
      if (response.status === 200 && response.data.data) {
        const { congestionNm, agncNm, spaceNm } = response.data.data;
        setCrowdData({
          resultCode: response.data.resultCode,
          resultMsg: response.data.resultMsg,
          totalCount: response.data.totalCount,
          data: {
            congestionNm,
            agncNm,
            spaceNm,
          },
        });
      } else {
        console.error("응답 데이터가 없거나 잘못된 형식입니다. 응답 데이터:", response.data);
        setCrowdData(null); // 응답 데이터가 없으면 상태를 null로 설정
        setErrorMessage("현재 본관에 대한 혼잡도 정보가 없습니다.");
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      setCrowdData(null); // 오류가 발생한 경우에도 상태를 null로 설정
      setErrorMessage("현재 본관에 대한 혼잡도 정보가 없습니다.");
    }
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 전시실 클릭 핸들러
  const handleLocationClick = (image: string, location: string, spacecode: string) => {
    setCurrentImage(image);
    setSelectedLocation(location);
    getCrowdData(spacecode); // 각 전시실의 spaceCode 값을 전달
    setResultVisible(true); // 결과 박스를 표시
    setErrorMessage(null);
  };

  // 로고 클릭
  const handleLogoClick = () => {
    setResultVisible(false);
    setSelectedLocation(null);
    setCrowdData(null);
    setCurrentImage(picture);
  };

  return (
    <div className={style.container}>
      <img src={currentImage} alt="background" className={style.mainImage} />
      <div className={style.header}>{formattedDate}</div>
      <div className={style.main}>
        <div className={style.logo}>
          <img src={logo} alt="background" onClick={handleLogoClick} />
        </div>
        <div className={style.select}>
          <p>지역을 선택해주세요!</p>
          <FaCheck size={30} color="white" />
        </div>
        <div className={style.line}></div>
        <div className={style.location}>
          관람객의 입장 기록을 기반으로 각 전시실의 실시간 체류 인원의 혼잡도를 알려드립니다
        </div>
        <div className={style.list}>
          <div className={style.box1} onClick={() => handleLocationClick(seoulImage, "서울관", "MMCA-SPACE-1001")}>
            서울관
          </div>
          <div className={style.box2} onClick={() => handleLocationClick(gwacheonImage, "과천관", "MMCA-SPACE-2001")}>
            과천관
          </div>
          <div
            className={style.box3}
            onClick={() => handleLocationClick(deoksugungImage, "덕수궁관", "MMCA-SPACE-4001")}
          >
            덕수궁관
          </div>
          <div className={style.box4} onClick={() => handleLocationClick(cheongjuImage, "청주관", "MMCA-SPACE-3001")}>
            청주관
          </div>
        </div>
        <div className={style.introduce}>
          <ul>
            <li>국내외 문화재의 보존·관리</li>
            <li>국내 다른 미술관에 대한 지도·지원 및 업무 협조</li>
            <li>국내 미술관 협력망의 구성 및 운영</li>
            <li>그 밖에 국가를 대표하는 미술관으로서의 기능 수행에 필요한 업무</li>
          </ul>
        </div>
      </div>
      {resultVisible && (
        <div className={style.result}>
          <div className={style.sentence}>
            {selectedLocation && crowdData ? (
              <div>
                <h3>{selectedLocation}</h3>
                <p>현재 혼잡도: {crowdData.data.congestionNm}</p>
                <p>전시실 이름: {crowdData.data.spaceNm}</p>
                <p>관리 기관: {crowdData.data.agncNm}</p>
              </div>
            ) : (
              errorMessage && <p>{errorMessage}</p> // 오류 메시지가 있으면 출력
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
