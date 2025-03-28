<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Create multiple users
        User::create([
            'name' => 'Gedeon Agmas',
            'email' => 'gedeonagmas2580@gmail.com',
            'password' => Hash::make('password123'), // Make sure to hash the password
            'phone' => '0954104637',
            'city' => 'Addis Ababa',
            'image' => null, // or provide a default image path
        ]);

        User::create([
            'name' => 'Jerry Alemayehu',
            'email' => 'jery@gmail.com',
            'password' => Hash::make('password123'),
            'phone' => '0987654321',
            'city' => 'Bahirdar',
            'image' => null,
        ]);

        // You can add more users as needed
    }
}
