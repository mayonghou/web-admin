import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './citydata.json',
        method: 'get',
        params: query
    });
};
