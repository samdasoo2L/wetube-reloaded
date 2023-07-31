# Wetube Reloaded

/ -> Home
/join -> Join
/login -> Login
/search -> Search

/users/:id -> See User
/users/logout -> Log Out
/users/edit -> Edit MY Profile
/users/delete -> Delete MY Profile

/videos/:id -> See Video
/videos/:id/edit -> Edit Video
/videos/:id/delete -> Delete Video
/videos/upload -> Upload Video

[퍼그의 포인트]
하나 : extends base.pug 로 기본틀 가져온다!
둘 : #{}로 변수를 가져와 섞어 쓰자! / 안섞을 때는 그냥 h1=변수명
셋 : include partials/footer.pug 쓰자! 똑같은 마무리를 partials로 간편하게!
넷 : block content로 이 부분은 내가 알아서 짤께!! 가능!!
다섯 : 속성들은 바로 붙여서! 괄호안에쓰자!
link(rel="stylesheet" href="https://unpkg.com/mvp.css")
여섯 : render로 퍼그사용! 확장자없이 퍼그파일명 따옴표 사용해서!!
=> res.render("home", { pageTitle: "Home" });

[데이터 수정 삭제 가져오기의 맥락]
하나 : 페이지를 get해서 들어가고,
둘 : 뭔가를 클릭해서 form에 입력하고,
셋 : submit 버튼을 눌러 post request를 보내고,
넷 : 해당 post controller가 실행되고,
다섯 : controlloer가 body로 부터 정보를 얻고 저장한다.

[데이터베이스의 목적 : CRUD]
create쓰기 / read읽기 / update수정 / delete삭제
