<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'introduce' => ['nullable', 'string'],
            'image_url' => ['nullable', 'image', 'max:255'],
            'facebook_url' => ['nullable', 'url', 'max:255'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'cv_url' => ['nullable', 'url', 'max:255'],
            'linkedin_url' => ['nullable', 'url', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
        ];
    }
}
