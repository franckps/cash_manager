export interface HttpRequest {
  params?: any;
  body?: any;
  query?: any;
}

export interface HttpResponse {
  statusCode: number;
  body?: any;
}
