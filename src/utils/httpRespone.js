const SUCCESS = "success";
const ERROR = "error";

function goodResponse(code, data, massage, newToken) {
    let httpResponse = {
        status: SUCCESS,
        code: code,
        data: data,
        newAccessToken: newToken ? newToken : null,
        massage: massage,
    };
    return httpResponse;
}

function badResponse(code, massage) {
    let httpResponse = {
        status: ERROR,
        code: code,
        data: null,
        newAccessToken: null,
        massage: massage,
    };
    return httpResponse;
}

module.exports = {
    SUCCESS,
    ERROR,
    goodResponse,
    badResponse,
};
