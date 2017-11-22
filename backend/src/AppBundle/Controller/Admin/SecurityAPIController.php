<?php

namespace AppBundle\Controller\Admin;

use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use AppBundle\Controller\BaseAPIController;
use AppBundle\Utils\APIResponseCode;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

class SecurityAPIController extends BaseAPIController
{
    /**
     * @Route("/api/login")
     * @Method("POST")
     */
    public function loginAction(Request $request)
    {
        $username = $request->get('username');
        $password = $request->get('password');

        $users = $this->getUser();

        if (!isset($users[$username])) {
            return $this->response(APIResponseCode::CODE_AUTH_INFO_INVALID);
        }

        if ($users[$username] != $password) {
            return $this->response(APIResponseCode::CODE_AUTH_INFO_INVALID);
        }

        $signer = new Sha256();

        $token = (new Builder())
            ->setIssuedAt(time())
            ->setNotBefore(time() + 1)
            ->setExpiration(time() + $this->getParameter('jwt_ttl'))
            ->set('username', $username)
            ->sign($signer, $this->getParameter('secret'))
            ->getToken();

        return $this->response(APIResponseCode::CODE_SUCCESS, [
            'token' => (string)$token
        ]);
    }

    protected function getUser()
    {
        $users = [
            'admin' => 'admin1',
            'admin2' => 'admin2'
        ];

        return $users;
    }
}
