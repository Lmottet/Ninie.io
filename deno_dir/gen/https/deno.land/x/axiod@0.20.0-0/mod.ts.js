import { urlJoin } from "https://deno.land/x/url_join/mod.ts";
import { methods } from "./helpers.ts";
function axiod(url, config) {
    if (typeof url === "string") {
        return axiod.request(Object.assign({}, axiod.defaults, { url }, config));
    }
    return axiod.request(Object.assign({}, axiod.defaults, url));
}
axiod.defaults = {
    url: "/",
    method: "get",
    timeout: 0,
    withCredentials: false,
    validateStatus: (status) => {
        return status >= 200 && status < 300;
    },
};
axiod.create = (config) => {
    const instance = Object.assign({}, axiod);
    instance.defaults = Object.assign({}, axiod.defaults, config);
    instance.defaults.timeout = 1000;
    return instance;
};
axiod.request = ({ url = "/", baseURL, method, headers, params, data, timeout, withCredentials, auth, validateStatus, paramsSerializer, transformRequest, transformResponse, }) => {
    if (baseURL) {
        url = urlJoin(baseURL, url);
    }
    if (method) {
        if (methods.indexOf(method.toLowerCase().trim()) === -1) {
            throw new Error(`Method ${method} is not supported`);
        }
        else {
            method = method.toLowerCase().trim();
        }
    }
    else {
        method = "get";
    }
    let _params = "";
    if (params) {
        if (paramsSerializer) {
            _params = paramsSerializer(params);
        }
        else {
            _params = Object.keys(params)
                .map((key) => {
                return (encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
            })
                .join("&");
        }
    }
    if (withCredentials) {
        if (auth?.username && auth?.password) {
            if (!headers) {
                headers = {};
            }
            headers["Authorization"] = "Basic " +
                btoa(unescape(encodeURIComponent(`${auth.username}:${auth.password}`)));
        }
    }
    const fetchRequestObject = {};
    if (method !== "get") {
        fetchRequestObject.method = method.toUpperCase();
    }
    if (_params) {
        url = urlJoin(url, `?${params}`);
    }
    if (data && method !== "get") {
        if (transformRequest &&
            Array.isArray(transformRequest) &&
            transformRequest.length > 0) {
            for (var i = 0; i < (transformRequest || []).length; i++) {
                if (transformRequest && transformRequest[i]) {
                    data = transformRequest[i](data, headers);
                }
            }
        }
        if (typeof data === "string" || data instanceof FormData) {
            fetchRequestObject.body = data;
        }
        else {
            try {
                fetchRequestObject.body = JSON.stringify(data);
                if (!headers) {
                    headers = {};
                }
                headers["Accept"] = "application/json";
                headers["Content-Type"] = "application/json";
            }
            catch (ex) { }
        }
    }
    if (headers) {
        const _headers = new Headers();
        Object.keys(headers).forEach((header) => {
            if (headers && headers[header]) {
                _headers.set(header, headers[header]);
            }
        });
        fetchRequestObject.headers = _headers;
    }
    return fetch(url, fetchRequestObject).then(async (x) => {
        const _status = x.status;
        const _statusText = x.statusText;
        let _data = null;
        const contentType = x.headers.get("content-type") || "";
        if (contentType.toLowerCase().indexOf("json") === -1) {
            try {
                _data = await x.json();
            }
            catch (ex) {
                _data = await x.text();
            }
        }
        else {
            _data = await x.json();
        }
        if (transformResponse) {
            if (transformResponse &&
                Array.isArray(transformResponse) &&
                transformResponse.length > 0) {
                for (var i = 0; i < (transformResponse || []).length; i++) {
                    if (transformResponse && transformResponse[i]) {
                        _data = transformResponse[i](_data);
                    }
                }
            }
        }
        const _headers = x.headers;
        const _config = {
            url,
            baseURL,
            method,
            headers,
            params,
            data,
            timeout,
            withCredentials,
            auth,
            paramsSerializer,
        };
        let isValidStatus = true;
        if (validateStatus) {
            isValidStatus = validateStatus(_status);
        }
        else {
            isValidStatus = _status >= 200 && _status < 300;
        }
        if (isValidStatus) {
            return Promise.resolve({
                status: _status,
                statusText: _statusText,
                data: _data,
                headers: _headers,
                config: _config,
            });
        }
        else {
            const error = {
                response: {
                    status: _status,
                    statusText: _statusText,
                    data: _data,
                    headers: _headers,
                },
                config: _config,
            };
            return Promise.reject(error);
        }
    });
};
axiod.get = (url, config) => {
    return axiod.request(Object.assign({}, { url }, config, { method: "get" }));
};
axiod.post = (url, data, config) => {
    return axiod.request(Object.assign({}, { url }, config, { method: "post", data }));
};
axiod.put = (url, data, config) => {
    return axiod.request(Object.assign({}, { url }, config, { method: "put", data }));
};
axiod.delete = (url, data, config) => {
    return axiod.request(Object.assign({}, { url }, config, { method: "delete", data }));
};
axiod.options = (url, data, config) => {
    return axiod.request(Object.assign({}, { url }, config, { method: "options", data }));
};
axiod.head = (url, data, config) => {
    return axiod.request(Object.assign({}, { url }, config, { method: "head", data }));
};
axiod.connect = (url, data, config) => {
    return axiod.request(Object.assign({}, { url }, config, { method: "connect", data }));
};
axiod.trace = (url, data, config) => {
    return axiod.request(Object.assign({}, { url }, config, { method: "trace", data }));
};
axiod.patch = (url, data, config) => {
    return axiod.request(Object.assign({}, { url }, config, { method: "patch", data }));
};
export default axiod;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQVE5RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXZDLFNBQVMsS0FBSyxDQUNaLEdBQXNCLEVBQ3RCLE1BQWlCO0lBRWpCLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1FBQzNCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUMxRTtJQUNELE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUVELEtBQUssQ0FBQyxRQUFRLEdBQUc7SUFDZixHQUFHLEVBQUUsR0FBRztJQUNSLE1BQU0sRUFBRSxLQUFLO0lBQ2IsT0FBTyxFQUFFLENBQUM7SUFDVixlQUFlLEVBQUUsS0FBSztJQUN0QixjQUFjLEVBQUUsQ0FBQyxNQUFjLEVBQUUsRUFBRTtRQUNqQyxPQUFPLE1BQU0sSUFBSSxHQUFHLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUN2QyxDQUFDO0NBQ0YsQ0FBQztBQUVGLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxNQUFpQixFQUFFLEVBQUU7SUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDMUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFD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