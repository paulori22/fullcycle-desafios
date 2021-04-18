FROM golang:1.14 AS Builder

WORKDIR /go/src/app
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

RUN go build -v ./...

FROM scratch
COPY --from=Builder /go/src/app/app .
CMD ["/app"]