export default function LoginPage() {
  return (
    <div className="login">
      <h1>로그인 페이지</h1>
      <form>
        <label htmlFor="username">사용자 이름:</label>
        <input type="text" id="username" name="username" required />
        <label htmlFor="password">비밀번호:</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
