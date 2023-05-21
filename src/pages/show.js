import '../App.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SHOW_RES(props){
    //const history = useNavigate();
    const [data, setData] = useState([]);

    const temp =[
    {
        "restaurant_name": "바른스시",
        "address": "경기 수원시 장안구 서부로",
        "image_url": "url",
        "category": "일식",
        "id": 1
    }];
  
    fetch('https://port-0-intro-to-se-teamproj-backend-7hqac2alhil3qhz.sel4.cloudtype.app/stores/' + props.res_id)
    .then((res) => res.json())
    .then(api_data => setData(api_data));
    
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=222fa53fe0708810cedfd8d617ac0d20&​libraries=services,clusterer,drawing";
        script.async = true;
        document.body.appendChild(script);
        
        var infowindow = new window.kakao.maps.InfoWindow({zIndex:1});

        var mapContainer = document.getElementById('map2'), // 지도를 표시할 div 
        mapOption = {
            center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };  

        var map = new window.kakao.maps.Map(mapContainer, mapOption);

        var ps = new window.kakao.maps.services.Places(); 

        //     // 키워드로 장소를 검색합니다
            ps.keywordSearch("성대" +temp[0].restaurant_name, placesSearchCB); 
        
            // 키워드 검색 완료 시 호출되는 콜백함수 입니다
            function placesSearchCB (data, status, pagination) {
            if (status === window.kakao.maps.services.Status.OK) {
        
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                var bounds = new window.kakao.maps.LatLngBounds();
        
                for (var i=0; i<data.length; i++) {
                    displayMarker(data[i]);    
                    bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
                }       
        
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds);
            } 
        }
        
        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place) {
            
            // 마커를 생성하고 지도에 표시합니다
            var marker = new window.window.kakao.maps.Marker({
                map: map,
                position: new window.window.kakao.maps.LatLng(place.y, place.x) 
            });
        
            // 마커에 클릭이벤트를 등록합니다
            window.kakao.maps.event.addListener(marker, 'click', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
            });
        
      }}, []);
    //map 불러오는 함수
    // var infowindow = new window.kakao.maps.InfoWindow({zIndex:1});

    // var mapContainer = document.getElementById('map2'), // 지도를 표시할 div 
    // mapOption = {
    //     center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
    //     level: 3 // 지도의 확대 레벨
    // };  

    // 지도를 생성합니다    
    //var map = new window.kakao.maps.Map(mapContainer, mapOption); 

    //장소 검색 객체를 생성합니다
   


    return(
      <div className='list_wrapper'>
        <div className='restaurant'>
            <div className='res_name'>
            <span>{temp[0].restaurant_name}</span>
            </div>
            <img className="res_img" alt="check" src="img/res_img1.png" />
            <div className='res_map'>
                <div id="map2" style={{ width: '400px', height: '350px' }}></div>
            </div>
            <div className='review' onClick={() => {
                props.setResId(temp[0].id);
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
  
    var request;
    if(props.cate === "x"){
      request = props.mood
    }
    else if(props.mood === "x"){
      request = props.cate
    }
  
    const temp = [
      {
      "restaurant_name": "바른스시",
      "address": "경기 수원시 장안구 서부로",
      "image_url": "url",
      "category": "일식",
      "id": 1
      },
      {
      "restaurant_name": "미가라멘",
      "address": "수원시 장안구 화산로221",
      "image_url": "url",
      "category": "일식",
      "id": 2
      }
  ,
      {
        "restaurant_name": "우리집",
        "address": "수원시 장안구 화산로221",
        "image_url": "url",
        "category": "일식",
        "id": 2
        }
    ];
  
    fetch('https://port-0-intro-to-se-teamproj-backend-7hqac2alhil3qhz.sel4.cloudtype.app/stores/categories/' + request)
    .then((res) => res.json())
    .then(api_data => setData(api_data));
  
    console.log(data);
    const result = [];
  
    for (let i = 0; i < temp.length; i++) {
      result.push(<div className='restaurant'>
        <img className="res_img" alt="check" src="img/res_img1.png" onClick={() => {
                props.setResId(temp[i].id);
                props.setMode("SHOW_RES"); 
              }}/>
        <div className='res_name'>
          <span>{temp[i].restaurant_name}</span>
        </div>
  </div>);
    }
  
    return(
      <div className='list_wrapper'>
          {result}
      </div>
    )
  }
  
  