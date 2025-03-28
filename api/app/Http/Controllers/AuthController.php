<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users|max:255',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'nullable|string|max:15',
            'city' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], [
            'name.required' => 'Please provide your name.',
            'email.required' => 'Email is required.',
            'email.unique' => 'This email has already been registered.',
            'password.required' => 'Password is required.',
            'password.confirmed' => 'Password confirmation does not match.',
            'phone.max' => 'Phone number cannot exceed 15 characters.',
            'city.max' => 'City name cannot exceed 255 characters.',
            'image.image' => 'Uploaded file must be an image.',
            'image.mimes' => 'Image must be a file of type: jpeg, png, jpg, gif.',
            'image.max' => 'Image cannot be larger than 2MB.',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'city' => $request->city,
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('profile_images', 'public');
            $user->image = $path;
            $user->save();
        }

        return response()->json(['user' => $user, 'message' => 'Registration successful.'], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ], [
            'email.required' => 'Email is required.',
            'password.required' => 'Password is required.',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'The provided credentials are incorrect.'], 401); // Return custom error response
        }

        $token = $user->createToken('Personal Access Token')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user, 'message' => 'Login successful.']);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully.']);
    }

    public function profile(Request $request)
    {
        // Check if the user is authenticated
        if (!$request->user()) {
            return response()->json(['message' => 'User not authenticated.'], 401); // Unauthorized response
        }

        // Retrieve the authenticated user's profile
        return response()->json([
            'user' => $request->user(),
            'message' => 'Profile retrieved successfully.'
        ]);
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $request->user()->id,
            'phone' => 'sometimes|nullable|string|max:15',
            'city' => 'sometimes|nullable|string|max:255',
            'image' => 'sometimes|nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], [
            'name.required' => 'Please provide your name.',
            'email.required' => 'Email is required.',
            'email.unique' => 'This email has already been registered.',
            'phone.max' => 'Phone number cannot exceed 15 characters.',
            'city.max' => 'City name cannot exceed 255 characters.',
            'image.image' => 'Uploaded file must be an image.',
            'image.mimes' => 'Image must be a file of type: jpeg, png, jpg, gif.',
            'image.max' => 'Image cannot be larger than 2MB.',
        ]);

        $user = $request->user();
        $user->name = $request->name ?? $user->name;
        $user->email = $request->email ?? $user->email;
        $user->phone = $request->phone ?? $user->phone;
        $user->city = $request->city ?? $user->city;

        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($user->image) {
                Storage::delete($user->image);
            }

            // Store the new image
            $path = $request->file('image')->store('profile_images', 'public');
            $user->image = $path;
        }

        $user->save();

        return response()->json(['message' => 'Profile updated successfully.', 'user' => $user]);
    }
}
