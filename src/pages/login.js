import './login.css';
import React, { useEffect, useState } from 'react';

export function Login(props) {
    const [id, setId] = useState("");
    const [pw, setPassword] = useState("");
  
    return (
      <>
        <div className='main_form'>
            <div className='login_wrapper'>
        <h2>로그인</h2>
  
        <div className="form">
          <p>
            <input
              className="login"
              type="text"
              name="username"
              placeholder="학번"
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
          </p>
          <p>
            <input
              className="login"
              type="password"
              name="pwd"
              placeholder="비밀번호"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </p>
  
          <p>
            <input
              className="btn"
              type="submit"
              value="로그인"
              onClick={() => {
                var formData = new FormData();
                formData.append("id", id);
                formData.append("password", pw);
                fetch(
                  "https://port-0-intro-to-se-teamproj-backend-7hqac2alhil3qhz.sel4.cloudtype.app/users/login",
                  {
                    method: "post", // method :통신방법
                    // headers: {
                    //   // headers: API 응답에 대한 정보를 담음
                    //   "content-type": "application/json",
                    // },
                    body: formData,
                    credentials: "include",
                  }
                )
                  // .then((response) => response.body)
                  // .then((body) => {
                  //   //const reader = body.getReader();
                  //   console.log(body);
                  // });
                  .then((res) => {
                    if (res.status === 200) {
                      alert("로그인 성공");
                      props.setMode("MAIN");
                      return res.json();
                    } else {
                      alert("로그인 실패");
                    }
                  })
                  .then((json) => {
                    console.log(json);
                  });
              }}
            />
            <p></p>
            <input
              className="btn"
              type="submit"
              value="회원가입"
              onClick={() => {
                props.setMode("SIGNIN");
              }}
            />
          </p>
        </div>
        </div>
        </div>
      </>
    );
  }
  
export function Signin(props) {
    const [id, setId] = useState("");
    const [pw, setPassword] = useState("");
    const [pw2, setPassword2] = useState("");
  
    return (
      <>
      <div className='main_form'>
            <div className='login_wrapper'>
        <h2>회원가입</h2>
  
        <div className="form">
          <p>
            <input
              className="login"
              type="text"
              placeholder="학번"
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
          </p>
          <p>
            <input
              className="login"
              type="password"
              placeholder="비밀번호"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </p>
          <p>
            <input
              className="login"
              type="password"
              placeholder="비밀번호 확인"
              onChange={(event) => {
                setPassword2(event.target.value);
              }}
            />
          </p>
  
          <p>
            <input
              className="btn"
              type="submit"
              value="회원가입"
              onClick={() => {
                if (pw === pw2) {
                  var formData = new FormData();
                  formData.append("id", id);
                  formData.append("password", pw);
                  fetch(
                    "https://port-0-intro-to-se-teamproj-backend-7hqac2alhil3qhz.sel4.cloudtype.app/users/signup",
                    {
                      method: "post",
                      body: formData,
                      credentials: "include",
                    }
                  )
                    .then((res) => {
                      if (res.status === 200) {
                        alert("회원가입 성공");
                      } else{
                        alert("회원가입 실패");
                        return res.json();
                      }
                    })
  
                    .then((res) => res.json())
                    .then((json) => {
                      console.log(json);
                    });
                } else {
                  alert("비밀번호가 일치하지 않습니다.");
                }
              }}
            />
          </p>
        </div>
  
        <p>
          로그인화면으로 돌아가기{" "}
          <button
            onClick={() => {
              props.setMode("LOGIN");
            }}
          >
            로그인
          </button>
        </p>
        </div>
        </div>
      </>
    );
  }
  
export function Main(props) {
    return (
      <>
        <div className="from">
          <h2>로그인 성공, 메인화면</h2>
          <p>
            <input
              className="btn"
              type="submit"
              value="로그인 체크"
              onClick={() => {
                fetch(
                  "https://port-0-intro-to-se-teamproj-backend-7hqac2alhil3qhz.sel4.cloudtype.app/users/logincheck",
                  {
                    method: "get",
                    // headers: {
                    //   // headers: API 응답에 대한 정보를 담음
                    //   "content-type": "application/json",
                    // },
                  }
                )
                  .then((res) => {
                    if (res.status === 200) {
                      alert("로그인 중입니다");
                    } else if (res.status === 401) {
                      alert("로그인 오류");
                      return res.json();
                    }
                  })
                  .then((json) => {
                    console.log(json);
                  });
              }}
            />
          </p>
          <p>
            <input
              className="btn"
              type="submit"
              value="로그아웃"
              onClick={() => {
                fetch(
                  "https://port-0-intro-to-se-teamproj-backend-7hqac2alhil3qhz.sel4.cloudtype.app/users/logout",
                  {
                    method: "get",
                  }
                )
                  .then((res) => {
                    if (res.status === 200) {
                      alert("로그아웃 성공");
                      props.setMode("LOGIN");
                    } else {
                      alert("로그아웃 실패");
                      return res.json();
                    }
                  })
                  .then((json) => {
                    console.log(json);
                  });
              }}
            />
          </p>
        </div>
      </>
    );
  }