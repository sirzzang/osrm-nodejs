# node-osrm

NodeJs routing server built with osrm-backend node wrapper

## Setup

1. download pbf data

   ```bash
   mkdir data
   cd data
   wget http://download.geofabrik.de/asia/south-korea-latest.osm.pbf
   ```

2. preprocess pbf data
   - MLD algorithm
     ```bash
     lib/binding/osrm-extract data/south-korea-latest.osm.pbf -p profiles/foot.lua
     lib/binding/osrm-partition data/south-korea-latest.osrm
     lib/binding/osrm-customize data/south-korea-latest.osrm
     ```
   - CH algorithm
     ```bash
     lib/binding/osrm-extract data/south-korea-latest.osm.pbf -p profiles/foot.lua
     lib/binding/osrm-contract data/south-korea-latest.osrm
     ```

<br>

**커밋 메시지 타입**([참고](https://medium.com/humanscape-tech/%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-commit-message-%EC%9E%91%EC%84%B1%EC%9D%84-%EC%9C%84%ED%95%9C-conventional-commits-ae885898e754))

- build: 시스템 또는 외부 종속성에 영향을 미치는 변경사항 (npm, gulp, yarn 레벨)
- ci: ci구성파일 및 스크립트 변경
- chore: 패키지 매니저 설정할 경우, 코드 수정 없이 설정을 변경
- docs: documentation 변경
- feat: 새로운 기능
- fix: 버그 수정
- perf: 성능 개선
- refactor: 버그를 수정하거나 기능을 추가하지 않는 코드 변경, 리팩토링
- style: 코드 의미에 영향을 주지 않는 변경사항 ( white space, formatting, colons )
- test: 누락된 테스트 추가 또는 기존 테스트 수정
- revert: 작업 되돌리기
