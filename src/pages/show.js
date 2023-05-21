import '../App.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SHOW_RES(props){
    //const history = useNavigate();
    const [data, setData] = useState([]);
  
  //console.log('http://127.0.0.1:8000/stores/' + props.res_id);
  //https://port-0-intro-to-se-teamproj-backend-7hqac2alhil3qhz.sel4.cloudtype.app/stores/
  var url ='http://127.0.0.1:8000/stores/' + props.res_id;
  var map;

  useEffect(() => {
    fetch(url)
    .then((res) => res.json())
    .then(api_data => setData(api_data));
  },[]);

  useEffect(() => {
  const script = document.createElement("script");
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=222fa53fe0708810cedfd8d617ac0d20&​libraries=services,clusterer,drawing";
    script.async = true;
    document.body.appendChild(script);
    
    var geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(data.address, function(result, status) {
      // 정상적으로 검색이 완료됐으면 
        if (status === window.kakao.maps.services.Status.OK) {
          var mapContainer = document.getElementById('map2'); // 지도를 표시할 div 
          var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          var mapOption = {
            center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };  
    
        map = new window.kakao.maps.Map(mapContainer, mapOption);
    
  
          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new window.kakao.maps.Marker({
              map: map,
              position: coords
          });

          var infowindow = new window.kakao.maps.InfoWindow({
            content: '<div style="width:150px;text-align:center;padding:6px 0;">' + data.name + '</div>'
        });
        infowindow.open(map, marker);
          
          marker.setMap(map);
          map.setCenter(coords);
      } 
  }
  );
},);


  
    return(
      <div className='list_wrapper'>
        <div className='restaurant'>
            <div className='res_name'>
            <span>{data.name}</span>
            </div>
            <img className="res_img" alt="image_load falied" src={data.image_url} />
            <div className='res_map'>
                <div id="map2" style={{ width: '400px', height: '350px' }}></div>
            </div>
            <div className='review' onClick={() => {
                props.setResId(data.id);
                props.setMode("REVIEW"); 
              }}>
                태그 리뷰
            </div>
        </div>
      </div>
    )
}

export function REVIEW(props){
    
}

export function SHOW_LIST(props) {
    const [data, setData] = useState([]);

    var url =  'http://127.0.0.1:8000/stores/';
    //'https://port-0-intro-to-se-teamproj-backend-7hqac2alhil3qhz.sel4.cloudtype.app/stores/';
    if(props.cate === "x"){
      url = url + 'tags/' +  props.mood
    }
    else if(props.mood === "x"){
      url = url + 'categories/' +  props.cate
    }
  
    useEffect(() => {
    fetch(url)
    .then((res) => res.json())
    .then(api_data => setData(api_data));
  }, [props.cate]); 
  
  useEffect(() => {
    fetch(url)
    .then((res) => res.json())
    .then(api_data => setData(api_data));
  }, [props.mood]); 

    //console.log(data);
    const result = [];
  
    for (let i = 0; i < data.length; i++) {
      result.push(<div className='restaurant'>
        <img className="res_img" alt="check" src={data[i].image_url} onClick={() => {
                props.setResId(data[i].id);
                props.setMode("SHOW_RES"); 
              }}/>
        <div className='res_name'>
          <span>{data[i].restaurant_name}</span>
        </div>
  </div>);
    }
  
    return(
      <div className='list_wrapper'>
          {result}
      </div>
    )
  }
  
  

  // const temp =[
  //   {
  //       "restaurant_name": "바른스시",
  //       "address": "경기 수원시 장안구 서부로",
  //       "image_url": "url",
  //       "category": "일식",
  //       "id": 1
  //   },
  //   {
  //     "restaurant_name": "미가라멘",
  //     "address": "수원시 장안구 화산로221",
  //     "image_url": "url",
  //     "category": "일식",
  //     "id": 2
  //     },
  //     {
  //       "restaurant_name": "우리집",
  //       "address": "수원시 장안구 화산로221",
  //       "image_url": "url",
  //       "category": "일식",
  //       "id": 3
  //       }
  // ];