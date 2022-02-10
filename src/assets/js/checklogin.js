export function managerchecklogin () {
	if (!sessionStorage.getItem('managername')) {
		this.$message.info("请先登录")
		this.$router.replace("/bankmanager/login")
	}
}

export function userchecklogin () {
	if (!sessionStorage.getItem('username')) {
		this.$message.info("请先登录")
		this.$router.replace("/bankuser/login")
	}
}
