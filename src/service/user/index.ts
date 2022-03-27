import request from "../index";

export function accountLoginService(user) {
  return request.post({
    url: "/login",
    data: user,
  });
}

export function getUserByIdService(id: number) {
  return request.get({
    url: `/users/${id}`,
  });
}

export function getUserMenusService(id: number) {
  return request.get({
    url: `/role/${id}/menu`,
  });
}
