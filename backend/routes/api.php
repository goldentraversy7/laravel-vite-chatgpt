<?php


use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\OAuthController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\Auth\VerificationController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\ChatRoomController;
use App\Http\Controllers\ChatRoomUserController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\QAController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group(['middleware' => 'cors'], function () {
    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('logout', [LoginController::class, 'logout']);

        Route::get('user', [UserController::class, 'current']);
        Route::get('users', [UserController::class, 'index']);
        Route::resource('chatrooms', ChatRoomController::class);
        Route::delete("chatrooms/{id}", [ChatRoomController::class, "destroy"]);
        Route::resource("chatroom_users", ChatRoomUserController::class);
        Route::resource('messages', MessageController::class);
        Route::resource('qas', QAController::class);

        Route::patch('settings/profile', [ProfileController::class, 'update']);
        Route::patch('settings/password', [PasswordController::class, 'update']);
    });

    Route::group(['middleware' => 'guest:api'], function () {
        Route::post('login', [LoginController::class, 'login']);
        Route::post('register', [RegisterController::class, 'register']);

        Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail']);
        Route::post('password/reset', [ResetPasswordController::class, 'reset']);

        Route::post('email/verify/{user}', [VerificationController::class, 'verify'])->name('verification.verify');
        Route::post('email/resend', [VerificationController::class, 'resend']);

        Route::post('oauth/{driver}', [OAuthController::class, 'redirect']);
        Route::get('oauth/{driver}/callback', [OAuthController::class, 'handleCallback'])->name('oauth.callback');
    });
});