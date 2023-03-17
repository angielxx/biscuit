###### builder stage ######
FROM node:[node version] as builder

# a. 작업 폴더를 만들고 npm 설치
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json

RUN npm install -g yarn --silent
RUN yarn install --silent

# b. 소스를 작업폴더로 복사하고 빌드
COPY . /usr/src/app
RUN yarn build

###### run stage ######
FROM nginx:latest
# c. nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# d. 위에서 생성한 앱의 빌드산출물을 nginx의 샘플 앱이 사용하던 폴더로 이동
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# e. [원하는 포트]번 포트 내부에 오픈하고 nginx 실행
    # nginx라서 기본 80번
EXPOSE [원하는 포트]
CMD ["nginx", "-g", "daemon off;"]
