onsaveIP: function(ipoption) {
	//console.log("ipoption", JSON.stringify(ipoption));

	var ip = sessionStorage.getItem('ip') //获取客户端的ip地址;
	let letIprecord = {};
	letIprecord.salesagent = ipoption.agent ? ipoption.agent : window.location.href;
	letIprecord.type = 'first page';
	letIprecord.ipaddress = ip;
	console.log("ip", ip);
	uni.request({
		url: '/api/iprecord/save',
		method: 'POST',
		data: letIprecord,
		success(res) {
			//debugger;				
			console.log('iprecord 发生变化：' + JSON.stringify(res));
		},
		fail(err) {
			console.log('iprecord失败：', err);
		}
	})
}

module.exports = {
	onsaveIP: onsaveIP,
}
