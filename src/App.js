import './App.css';
import React, { useEffect, useState } from 'react';
import Header from "./component/layout/header";
import Footer from "./component/layout/footer";
import {Login, Signin} from "./pages/login";
import {SHOW_RES, SHOW_LIST, REVIEW, REVIEW2} from "./pages/show"
import { useNavigate } from 'react-router-dom';


function App() {
  useEffect(() => {
    setMode("MAIN");
    }, []);

    const [tag, setTag] = useState("");
    const [mode, setMode] = useState("");
    const [cate, setCate] = useState("");
    const [mood, setMood] = useState("");
    const [res_id, setResId] = useState("");
    const [name, setName] = useState("");

  let content = null;

  if (mode === "MAIN") {
    content = <MAIN setMode={setMode} ></MAIN>;
  }
  else if(mode === "CATEGORY") {
    content = <CATEGORY setMode={setMode} setCate={setCate} setMood={setMood}></CATEGORY>;
  }
  else if(mode === "MOOD") {
    content = <MOOD setMode={setMode} setCate={setCate} setMood={setMood}></MOOD>;
  }
  else if(mode === "SHOW_LIST") {
    content = <SHOW_LIST setMode={setMode}
    cate={cate}
    mood={mood}
    setResId={setResId}
    setName={setName}
    setTag={setTag}
   ></SHOW_LIST>;
  }else if (mode === "LOGIN") {
    content = <Login setMode={setMode}></Login>;
  } else if (mode === "SIGNIN") {
    content = <Signin setMode={setMode}></Signin>;
  } else if (mode === "SHOW_RES") {
    content = <SHOW_RES 
        setMode={setMode}
        setTag={setTag}
        setName={setName}
        tag={tag}
        res_id={res_id}
        ></SHOW_RES>;
  } else if (mode === "REVIEW") {
    content = (
    <REVIEW setMode={setMode} tag={tag} name={name} res_id={res_id}></REVIEW>
    );
  } else if (mode === "REVIEW2") {
    content = <REVIEW2 setMode={setMode} res_id={res_id}></REVIEW2>;
  }


  return (
    <div>
      <Header setMode={setMode}/>
        <div className="App"> 
            {content}
        </div>
        <Footer setMode={setMode}/>
     </div>
  );
}

export default App;

function MAIN(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/stores')
    .then((res) => res.json())
    .then(api_data => setData(api_data));
  
  }, []);

  useEffect(() => {

  const script = document.createElement("script");
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=222fa53fe0708810cedfd8d617ac0d20&​libraries=services,clusterer,drawing";
    script.async = true;
    document.body.appendChild(script);
    
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.29713945326111, 126.971524553),
      level: 3
    };
    var map = new window.kakao.maps.Map(container, options);

    var geocoder = new window.kakao.maps.services.Geocoder();
    
    for(let i=0;i<data.length; i++){
      geocoder.addressSearch(data[i].address, function(result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
    
            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new window.kakao.maps.Marker({
                map: map,
                position: coords
            });
            
            marker.setMap(map);
            var iwContent = '<div style="padding:5px;">' + data[i].restaurant_name+'</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            iwRemoveable = false; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

            // 인포윈도우를 생성합니다
            var infowindow = new window.kakao.maps.InfoWindow({
                content : iwContent,
                removable : iwRemoveable
            });

            window.kakao.maps.event.addListener(marker, 'mouseover', function() {
              // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
                infowindow.open(map, marker);
            });
            
            // 마커에 마우스아웃 이벤트를 등록합니다
            window.kakao.maps.event.addListener(marker, 'mouseout', function() {
                // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
                infowindow.close();
            });
        } 
    });

  
  }   
}, ); 

  return (
    <>
    <div className='main_form'>
      <div className='main_find'>
        <div className='random_menu' onClick={() => {
              random_menu();
            }}>
          <img className="category_img" alt="cate_img" src="img/find_cate_img.png" />
          <span id='random'> 고민될때는? 메뉴 정해줘!</span>
        </div>
        </div>

        <div className='main_find'>
          <div className='find_category' onClick={() => {
              props.setMode("CATEGORY");
            }}>
            <span>카테고리로 식당 정하기!</span>
            <img className="category_img" alt="cate_img" src="img/category_img.png" />
          </div>
          <div className='find_mood' onClick={() => {
              props.setMode("MOOD");
            }}>
            <span>분위기로 식당 정하기!</span>
            <img className="mood_img" alt="mood_img" src="img/mood_img.png" />
          </div>
        </div>

        <div className='find_nearby'>
        <span> 내 근처 식당부터 찾기!</span>
        <img className="nearby_img" alt="nearbyimg" src="img/nearby_img.png" />
        </div>

        <div className='show_map'>
        <div id="map" style={{ width: '500px', height: '400px' }}></div>
        </div>
      </div>
      </>
  )
}

function CATEGORY(props) {
  const [show1, setVisible1] = useState(false);
  const [show2, setVisible2] = useState(false);
  const [show3, setVisible3] = useState(false);
  const [show4, setVisible4] = useState(false);
  const [show5, setVisible5] = useState(false);
  const [show6, setVisible6] = useState(false);
  const [show7, setVisible7] = useState(false);
  props.setMood("x");

  return (
    <>
    <div className='menu_wrapper'>
      <div className='big_menu' onClick={
        ()=> { setVisible1(!show1);}
      }>
          <div><span>한식</span></div>
          <img className="check" alt="check" src="img/check.png" />
      </div>
      
      <div className='big_menu' onClick={
        ()=> { setVisible2(!show2);}
      }>
        <div><span>일식</span></div>
        <img className="check" alt="check" src="img/check.png" />
      </div>

      {show1 && SMALL_MENU(1,props)}
      {show2 && SMALL_MENU(2,props)}


      <div className='big_menu' onClick={
        ()=> { setVisible3(!show3);}
      }>
        <div><span>중식</span></div>
        <img className="check" alt="check" src="img/check.png" />
      </div>

      <div className='big_menu' onClick={
        ()=> { setVisible4(!show4);}
      }>
        <div><span>양식</span></div>
        <img className="check" alt="check" src="img/check.png" />
      </div>

      {show3 && SMALL_MENU(3,props)}
      {show4 && SMALL_MENU(4,props)}

      <div className='big_menu'  onClick={
        ()=> { setVisible5(!show5);}
      }>
        <div><span>야식</span></div>
        <img className="check" alt="check" src="img/check.png" />
      </div>

      <div className='big_menu'  onClick={
        ()=> { setVisible6(!show6);}
      }>
        <div><span>아시안</span></div>
        <img className="check" alt="check" src="img/check.png" />
      </div>

      {show5 && SMALL_MENU(5,props)}
      {show6 && SMALL_MENU(6,props)}

      <div className='big_menu'  onClick={
        ()=> { setVisible7(!show7);}
      }>
        <div><span>면요리</span></div>
        <img className="check" alt="check" src="img/check.png" />
      </div>

      {show7 && SMALL_MENU(7,props)}

    </div>
    </>
  )
}

function random_menu(){
  const menu_list = ["고기", "파스타", "치킨", "칼국수", "라멘&우동", "돈까스", "커리", "중국집", "백반", "분식", "족발&보쌈"];
  const container = document.getElementById('random');
  let chosen = Math.floor(Math.random()*11);

  for(let i=1; i<=33+chosen; i++){
    setTimeout(function (){
      if(i=== 33+chosen) {container.innerHTML= "오늘의 메뉴는... " + menu_list[i%11] + "!"; }
      else container.innerHTML= "오늘의 메뉴는... " + menu_list[i%11];
      console.log(i);
    }, Math.pow(i,2.2));
  }


}

function MOOD(props) {
  props.setCate("x");

  const list =["밥약", "오늘은 거하게", "동아리 회식", "데이트 맛집", "어른들과 약속", "가성비 최고", "비싸도 맛있어"]

  const rendering = () => {
    const result = [];
    for (let i = 0; i < list.length; i++) {
      result.push(<div className='mood_menu'>
        <div className='tag'><span>#{list[i]}</span></div>
        <img className="check" alt="check" src="img/check.png" onClick={() => {
              props.setMood(i);
              props.setMode("SHOW_LIST"); 
            }}/>
  </div>);
    }
    return (
      <div className='mood_wrapper'>
              {result}
      </div>
    )
  };

  return <>{rendering()}</>;
}

function SMALL_MENU(option, props){
  var list =[];
  if (option === 1) {
    list = ["분식", "족발보쌈","탕&찌개", "국물&비빔국수", "백반", "고기"];
  }
  else if(option === 2){
    list = ["초밥","회", "라멘&우동", "돈까스", "덮밥", "우동"];
  }
  else if(option === 3){
    list = ["중국집", "마라탕", "양꼬치", "우육면", "딤섬", "훠궈"];
  }
  else if(option === 4){
    list = ["파스타", "피자", "리조또", "스테이크", "햄버거"]
  }
  else if(option === 5){
    list = ["치킨", "곱창", "닭발", "육회", "전", "족발보쌈"]
  }
  else if(option === 6){
    list = ["쌀국수", "월남쌈", "커리", "마라탕", "양꼬치"]
  }
  else if(option === 7){
    list = ["파스타", "라멘&우동", "짬뽕&자장면", "국물&비빔국수", "쌀국수", "칼국수"];
  }

const rendering = () => {
    const result = [];
    for (let i = 0; i < list.length; i++) {
      result.push(<div className='small_menu'>
        <div><span>{list[i]}</span></div>
        <img className="check" alt="check" src="img/check.png" onClick={() => {
              props.setCate(list[i]);
              props.setMode("SHOW_LIST"); 
            }}/>
  </div>);
    }
    return result;
  };

  return <>{rendering()}</>;
}