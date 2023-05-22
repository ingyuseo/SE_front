import "../App.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SHOW_RES(props) {
  //const history = useNavigate();
  const [data, setData] = useState([]);
  const [res_id, setResId] = useState("");
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  //console.log('http://127.0.0.1:8000/stores/' + props.res_id);
  //https://port-0-intro-to-se-teamproj-backend-7hqac2alhil3qhz.sel4.cloudtype.app/stores/
  var url = "http://127.0.0.1:8000/stores/" + props.res_id;
  var map;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((api_data) => setData(api_data));
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=222fa53fe0708810cedfd8d617ac0d20&​libraries=services,clusterer,drawing";
    script.async = true;
    document.body.appendChild(script);

    var geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(data.address, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === window.kakao.maps.services.Status.OK) {
        var mapContainer = document.getElementById("map2"); // 지도를 표시할 div
        var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        var mapOption = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

        map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new window.kakao.maps.Marker({
          map: map,
          position: coords,
        });

        var infowindow = new window.kakao.maps.InfoWindow({
          content:
            '<div style="width:150px;text-align:center;padding:6px 0;">' +
            data.name +
            "</div>",
        });
        infowindow.open(map, marker);

        marker.setMap(map);
        map.setCenter(coords);
      }
    });
  });

  return (
    <div className="list_wrapper">
      <div className="restaurant">
        <div className="res_name">
          <span>{data.name}</span>
        </div>
        <img className="res_img" alt="image_load falied" src={data.image_url} />
        <div className="res_map">
          <div id="map2" style={{ width: "400px", height: "350px" }}></div>
        </div>
        <div className="review_btn_container">
          <div
            className="btn_review"
            onClick={() => {
              setResId(data.id);
              props.setName(data.name);
              props.setMode("REVIEW");
            }}
          >
            리뷰 보기
          </div>
          <div
            className="btn_review"
            onClick={() => {
              setResId(data.id);
              props.setMode("REVIEW2");
            }}
          >
            리뷰 쓰기
          </div>
        </div>
      </div>
    </div>
  );
}

export function REVIEW(props) {
  const [data, setData] = useState([]);
  let [tag, setTag] = useState([{}]);
  let [render, setRender] = useState(true);

  var url = "http://127.0.0.1:8000/stores/" + props.res_id + "/reviews";
  useEffect(() => {
    fetch(url, {
      method: "get",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((api_data) => {
        setTag(api_data);
      });
  }, []);

  var arr = tag[0];

  if (
    arr["tag1"] === 0 &&
    arr["tag2"] === 0 &&
    arr["tag3"] === 0 &&
    arr["tag4"] === 0 &&
    arr["tag5"] === 0 &&
    arr["tag6"] === 0 &&
    arr["tag7"] === 0
  ) {
    setRender(false);
  }

  if (render === true) {
    console.log(props.name) + "1";

    return (
      <div>
        <div className="review_container">
          <div>{props.name}의 리뷰 목록</div>
          <div className={"review"}>밥약 : {arr["tag1"]}</div>
          <div className={"review"}>오늘은 거하게 : {arr["tag2"]}</div>
          <div className={"review"}>동아리 회식 : {arr["tag3"]}</div>
          <div className={"review"}>데이트 맛집 : {arr["tag4"]}</div>
          <div className={"review"}>어른들과 약속 : {arr["tag5"]}</div>
          <div className={"review"}>가성비 최고 : {arr["tag6"]}</div>
          <div className={"review"}>비싸도 맛있어 : {arr["tag7"]}</div>
        </div>
      </div>
    );
  } else {
    alert("등록된 리뷰가 없습니다.");
    props.setMode("SHOW_RES");
  }
}

export function REVIEW2(props) {
  let [click, setClick] = useState("non-click");

  return (
    <div>
      <div className="menu_wrapper">
        <div
          className={click === "tag1" ? "click" : "non-click"}
          onClick={() => {
            setClick("tag1");
          }}
        >
          밥약
        </div>
        <div
          className={click === "tag2" ? "click" : "non-click"}
          onClick={() => {
            setClick("tag2");
          }}
        >
          오늘은 거하게
        </div>
        <div
          className={click === "tag3" ? "click" : "non-click"}
          onClick={() => {
            setClick("tag3");
          }}
        >
          동아리 회식
        </div>
        <div
          className={click === "tag4" ? "click" : "non-click"}
          onClick={() => {
            setClick("tag4");
          }}
        >
          데이트 맛집
        </div>
        <div
          className={click === "tag5" ? "click" : "non-click"}
          onClick={() => {
            setClick("tag5");
          }}
        >
          어른들과 약속
        </div>
        <div
          className={click === "tag6" ? "click" : "non-click"}
          onClick={() => {
            setClick("tag6");
          }}
        >
          가성비 최고
        </div>
        <div
          className={click === "tag7" ? "click" : "non-click"}
          onClick={() => {
            setClick("tag7");
          }}
        >
          비싸도 맛있어
        </div>
      </div>

      <div>
        <div
          className="btn_tag"
          onClick={() => {
            var formData = new FormData();
            var t1 = 0;
            var t2 = 0;
            var t3 = 0;
            var t4 = 0;
            var t5 = 0;
            var t6 = 0;
            var t7 = 0;
            if (click === "tag1") {
              t1 = 1;
            } else if (click === "tag2") {
              t2 = 1;
            } else if (click === "tag3") {
              t3 = 1;
            } else if (click === "tag4") {
              t4 = 1;
            } else if (click === "tag5") {
              t5 = 1;
            } else if (click === "tag6") {
              t6 = 1;
            } else if (click === "tag7") {
              t7 = 1;
            }
            formData.append("tag1", t1);
            formData.append("tag2", t2);
            formData.append("tag3", t3);
            formData.append("tag4", t4);
            formData.append("tag5", t5);
            formData.append("tag6", t6);
            formData.append("tag7", t7);

            if (click === "non-click") {
              alert("선택하신 리뷰가 없습니다.");
            } else {
              fetch(
                "http://127.0.0.1:8000/stores/" + props.res_id + "/reviews",
                {
                  method: "post",
                  body: formData,
                  credentials: "include",
                }
              )
                .then((res) => {
                  //console.log(res);
                  return res.json();
                })
                .then((json) => {
                  console.log(json);
                });

              alert("태그가 등록 완료됐습니다.");
              props.setMode("REVIEW");
            }
          }}
        >
          태그 등록하기
        </div>
      </div>
    </div>
  );
}

export function SHOW_LIST(props) {
  const [data, setData] = useState([0, 0]);

  var url = "http://127.0.0.1:8000/stores/";
  //'https://port-0-intro-to-se-teamproj-backend-7hqac2alhil3qhz.sel4.cloudtype.app/stores/';
  if (props.cate === "x") {
    url = url + "tags/" + props.mood;
  } else if (props.mood === "x") {
    url = url + "categories/" + props.cate;
  }

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((api_data) => setData(api_data));
  }, [props.cate]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((api_data) => setData(api_data));
  }, [props.mood]);

  //console.log(data);
  const result = [];

  for (let i = 0; i < data.length; i++) {
    result.push(
      <div className="restaurant">
        <img
          className="res_img"
          alt="check"
          src={data[i].image_url}
          onClick={() => {
            props.setResId(data[i].id);
            props.setName(data[i].restaurant_name);

            props.setMode("SHOW_RES");
          }}
        />
        <div className="res_name">
          <span>{data[i].restaurant_name}</span>
        </div>
      </div>
    );
  }
  // setTimeout(() => {
  //   if (data.length === 0) {
  //     alert(data.length);
  //   }
  // }, 2000);
  useEffect(() => {
    if (data.length === 0) {
      alert("해당 카테고리에 맞는 음식점이 없습니다.");
    }
  }, [data.length]);

  return <div className="list_wrapper">{result}</div>;
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
