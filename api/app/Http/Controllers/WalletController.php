<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wallet; // Import the Wallet model
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class WalletController extends Controller
{
    public function topup(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id', // Ensure driver exists
            'amount' => 'required|numeric|min:1', // Ensure amount is a positive number
        ]);

        // Find or create the wallet for the driver
        $wallet = Wallet::firstOrCreate(['user_id' => $request->user_id]);

        // Start a database transaction
        DB::beginTransaction();
        try {
            // Update the wallet balance
            $wallet->balance += $request->amount;
            $wallet->save();

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Wallet topped up successfully.', 'new_balance' => $wallet->balance], 200);
        } catch (\Exception $e) {
            // Rollback the transaction on any error
            DB::rollBack();
            throw ValidationException::withMessages(['error' => 'Failed to top up wallet.']);
        }
    }

    public function use(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id', // Ensure driver exists
            'amount' => 'required|numeric|min:1', // Ensure amount is a positive number
        ]);

        // Find or create the wallet for the driver
        $wallet = Wallet::firstOrCreate(['user_id' => $request->user_id]);

        // Start a database transaction
        DB::beginTransaction();
        try {
            // Update the wallet balance
            $wallet->balance -= $request->amount;
            $wallet->save();

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Wallet topped up successfully.', 'new_balance' => $wallet->balance], 200);
        } catch (\Exception $e) {
            // Rollback the transaction on any error
            DB::rollBack();
            throw ValidationException::withMessages(['error' => 'Failed to top up wallet.']);
        }
    }

    public function balance($user_id)
    {
        // Find or create the wallet for the user
        $wallet = Wallet::firstOrCreate(['user_id' => $user_id]);

        // If the wallet was just created, you can return a message indicating that
        if (!$wallet->wasRecentlyCreated) {
            // Wallet exists, retrieve balance
            $balance = $wallet->balance;
            $status = $balance >= 50 ? "Can accept rides" : "Insufficient balance, please top up";

            return response()->json(['balance' => $balance, 'status' => $status], 200);
        } else {
            // Wallet created, return initial balance
            return response()->json(['balance' => 0, 'status' => "Insufficient balance, please top up"], 200);
        }
    }

    public function findSecondLargest(Request $request)
    {
        $request->validate([
            'numbers' => 'required|array|min:2',
            'numbers.*' => 'numeric',
        ]);

        $arr = $request->input('numbers');


        $secondLargest = $this->getSecondLargest($arr);

        // Return the result as a JSON response
        return response()->json([
            'second_largest' => $secondLargest
        ]);
    }

    /**
     * Logic to find the second largest number in the array.
     */
    private function getSecondLargest($arr)
    {
        $largest = PHP_INT_MIN;
        $secondLargest = PHP_INT_MIN;

        foreach ($arr as $num) {
            if ($num > $largest) {
                $secondLargest = $largest;
                $largest = $num;
            } elseif ($num > $secondLargest && $num < $largest) {
                $secondLargest = $num;
            }
        }

        // If second largest is still PHP_INT_MIN, return null (no valid second largest)
        return ($secondLargest === PHP_INT_MIN) ? null : $secondLargest;
    }
}
