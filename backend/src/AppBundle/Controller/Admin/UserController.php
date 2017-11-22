<?php

namespace AppBundle\Controller\Admin;

use AppBundle\Controller\BaseAPIController;
use AppBundle\Controller\JWTAuthenticatedController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

class UserController extends BaseAPIController implements JWTAuthenticatedController
{
    /**
     * @Route("/api/get-user-info")
     * @Method("GET")
     */
    public function getUserInfoAction(Request $request)
    {
        $username = $request->get('username');
        return $this->responseSuccess([
            'userInfo' => [
                'username' => $username
            ]
        ]);
    }
}
