<?php

namespace AppBundle\Controller\Admin;

use AppBundle\Controller\BaseAPIController;
use AppBundle\Controller\JWTAuthenticatedController;
use AppBundle\Utils\APIResponseCode;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class TestController extends BaseAPIController implements JWTAuthenticatedController
{
    /**
     * @Route("/jwt-test")
     */
    public function jwtTestAction()
    {
        return $this->response(APIResponseCode::CODE_SUCCESS, [
            'id' => 1
        ]);
    }
}
