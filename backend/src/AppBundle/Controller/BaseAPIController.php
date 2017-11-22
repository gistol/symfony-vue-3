<?php

namespace AppBundle\Controller;

use AppBundle\Utils\APIResponseCode;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class BaseAPIController extends Controller
{
    /**
     * 根据响应码跟接口数据生成一个 JsonResponse
     *
     * @param $code
     * @param array $data
     * @return JsonResponse
     */
    protected function response($code, $data = [])
    {
        return $this->get('app.api_response_generator')->generate($code, $data);
    }

    /**
     * 返回一个带有成功相应码的 JsonResponse
     * @param array $data
     * @return JsonResponse
     */
    protected function responseSuccess($data = [])
    {
        return $this->response(APIResponseCode::CODE_SUCCESS, $data);
    }
}
