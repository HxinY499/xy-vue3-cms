import request from "../index";

export function getPageList(pageName: string, queryInfo: any) {
  return request.post({
    url: `/${pageName}/list`,
    data: queryInfo,
  });
}

export function editPageData(pageUrl: string, editData: any) {
  return request.patch({
    url: pageUrl,
    data: editData,
  });
}
