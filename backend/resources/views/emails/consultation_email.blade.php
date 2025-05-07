<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    .button {
      background: #4F46E5;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 6px;
    }
  </style>
</head>
<body>
  <p>Hello {{ $user->name }},</p>
  <p>Your consultation is accepted. make sure to join your meeting link on the right time:</p>
  <p><a href="{{ $link }}" class="button">Join Meeting</a></p>
  <p>Thanks,<br>{{ config('app.name') }}</p>
</body>
</html>
