<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:4000', 'https://yourfrontend.com'], // Adjust as necessary
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // Allow all headers
    'exposed_headers' => ['Authorization'], // This is optional
    'max_age' => 0,
    'supports_credentials' => true, // Important if using cookies for sessions
];
