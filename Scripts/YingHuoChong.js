


#======================================#
# 👇本地重写
[Rewrite]
^https://gw.winhc.cn/firefly-login/users response-body-json-replace body.userExt.personVipEndTime 1797859092000 body.userExt.vipEndTime 1797859092000 body.userExt.vipStartTime 1789996692000 body.userExt.vipSign "0" body.userExt.identity "3"

# 👇中间人攻击，证书，主机名
[Mitm]
hostname = gw.winhc.cn