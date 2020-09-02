<template>
  <div class="safeSetting">
    <h2>安全设置</h2>
    <div class="form-container">
      <div class="form-item">
        <a-card hoverable style="width: 300px">
          <template slot="actions" class="ant-card-actions">
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>绑定</span>
              </template>
              <a-icon key="paper-clip" type="paper-clip" />
            </a-tooltip>
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>修改</span>
              </template>
              <a-icon key="edit" type="edit" />
            </a-tooltip>
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>解绑</span>
              </template>
              <a-icon key="delete" type="delete" theme="twoTone" two-tone-color="#ff4d4f" />
            </a-tooltip>
          </template>
          <a-card-meta :title="formData.phone.label" :description="formData.phone.bind || formData.phone._bind" >
            <a-avatar
              slot="avatar"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAU1UlEQVR4Xu2dB8w1R3WGX3AECEWQSDQlmACmyDRRQsAEML2DTccEQhITEnpHNFMUMN1gwIDp3ZhObMehmMR0CB2CIfRmIAhEFUKAiB60Gy7X937f7plzdmf2niNd2dK/c2bmnX2+3Zmdc+ZsSksFUoGtCpwttUkFUoHtCiQgeXekAnsokIDk7ZEKJCB5D6QCNgXyCWLTLUvtiAIJyI4MdHbTpkACYtMtS+2IAgnIjgx0dtOmQAJi0y1L7YgCCciODHR206ZAAmLTLUvtiAIJyI4MdHbTpkACYtMtS+2IAgnIjgx0dtOmQAJi0y1L7YgCCciODHR206ZAAmLTLUvtiAIJyI4MdHbTpkACYtMtS+2IAgnIjgx0dtOmQAJi0y1L7YgCCciODHRBN28k6YaSriHpgt3vt5K+I+lMSSdL+oCkDxbUUW3RBKTaoZm9YUdIur+kqw1syYclHSvphIHXN3FZAtLEME3ayIMkPU3SrY21vkXSQyV92Vi+qmIJSFXDMXtjgAI4gKTEgANIgKVpS0CaHj7Xxt9W0htdPUp3kPQGZ5+TuktAJpW72sp4crw5qHVNQ5KABN0VDbk9fIJXoWYhSUAaupMDmnorSW8L8LvJZZOQJCAT3R0VVnMLSSdN3K7mIElAJr5DKqnuZpJOmaktTUGSgMx0l8xY7U0knTpj/VTdDCQJyMx3ysTVs23k7RPXua26JiBJQCq5WyZoxg0kvXOCesZUUT0kCciY4Wz32utJOq3S5lcNSQJS6V3j2KzrSPoPR3+Pl3R2SUc5+qwWkgTEcZQrdHWopP90bBdwPK7zd7SkRzj6rhKSBMRxhCtzdS1J73Fs0yocvdundpsSvaqpDpIExGto6/Lz15Le59ikTXD07o+R9EDHuqqCJAFxHNlKXB3SRfh5NWcvOPo6ni3pvl4V1vSdJAFxHNUKXBH99yHHdgyBo6/ueZLu6Vh3FU+SBMRxRGd2dVVJH3Fswxg4+mpfKOkfHdswOyQJiONozujqKpI+6li/BY6++pdJ+jvHtswKSQLiOJIzuarhybHe9VdJuoujHrNBkoA4juIMrq7unG6n5Mmx3n2ym9zJUZNZIElAHEdwYldTLuVau0Y8+u2shTeUI24+KjR4YzMTEMfRm9DVtSWd7lif55NjvVlkNiGs18O+Lummks7wcDbERwIyRKW6ronYW9VvH4nqKZGLRDB6GNv1iWmZxBKQSWR2q6RFOPrOE6TldWM/y/nr/dYBSkDc7t1wR+foJuRXdqop8rVqWxPfJen6Tu3/J0l8dwm1BCRUXlfnD+myHno4nQOOvt1svedJWGrflHRFST8sdbRX+QQkUl0/3+eV9FlJF3ZwOScc3pCwSZLXrTBLQMKkdXXslaKnBjg8IfmEJK9Xzo0DloC43sdhzo6TdK9C7zXB4QkJX+xfU6jN1uIJSJSyvn7/S9JfFrisEQ4vSN4h6cYF2uxZNAGJUtbX7zckHWh0WTMcXpBcIuo8kgTEeNdNXOyXkljmHWstwOEByW2iEnAnIGNvuXmuZynzTw1Vf76LzvuMoezURUq27If9IUhApr4NbPV9TtLBtqL6UgcJKz612/GS7mFoJPu9eIq4WwLiLmmIw9KPa1/tIPEMqoro6DUlvdfgmCPfmIe4WwLiLmmIw3tLem6hZ748E1PhGbNe2KSzFP9zSd8yOP2NpD8ylNu3SAKyr0RVXHAFSZ9yaAlnmwOJZ0ogh2b9gQvOYB9rP5HEbgN3S0DcJQ1zyAGbBAyV2v92kHjGk5S2abW8BZAzJfH0cbcExF3SMIeemRJZFQM2z7SkXh23API/ki7t1YBVPwlIhKpxPjnDnF29HsZryWGVQfJXkj5s6FzYnqwExDAaMxchoo6DcDzs512kXy1PkvtIeo6hY6x8EYbsbgmIu6STOCxd9l1tJF/pifSrAZJXSrqrQUECpwigcrcExF3SyRx6QvJrSTesABJW6lixG2th0YUJyNihqOt6T0jo2XVnhIRl2h8Z5WWn88eMZfcsloBEqDqtz6VAYj1g9BeSzh0leQISpey0fpcAiTXm/gOSSKIXYglIiKyzOG0dEusEnWMX2IoTYglIiKyzOW0Zki9IupRBOY5beLGh3KAiCcggmZq6qEVISo6pDpugM+oJSFP3/uDGtgbJkyQ9fHDvfn/h9yVdwFBucJEEZLBUzV3YEiQs0VrS9/x7l8w6bHASkDBpq3DcAiTW/VcI/CBJz4xUOgGJVLcO37VD8ihJTzBKdTlJ/20sO6hYAjJIpuYvqhkS9oAdalA4bIPialsSEMPINFqkRkhIREFCCos9RtK/WAqOKZOAjFGr/Ws9ISF8988KJbmfpGONPjif0RI7Mqq6BGSUXIu42AsS5g1HFSpymiS+gYy1sACp9YYkIGOHZhnXe0ByMUlfK5DjEEnso7LYU4zfTUbXlYCMlmwxBUogeZ2kIwqVKAkfvoEknj7hloCES1xtBWRcPMjYOs4rOcVYlmLkGWZybqk/LEHDpv4kIAWj3HDRO0riKWAxj+3ld5J0gqVySU+X9FBj2dHFEpDRki2iwAclsQpksfs6ZHl8vaTbWyrv2h2+etW3LQExjlLDxW4l6W3G9rO0e3lJPzCWpxhb2nm9OsDgY9Iz0mlfAmIYpcaL/KukWxr7cIykBxvL9sXYtcvuXYvdXdJLLAWtZRIQq3JtlmNLR0l6HzYWchyc1c4u6SOSOAtkrH1b0mUl/XhswZLrE5AS9dorS+TdkcZmv1XSrY1l+2IcRMqBpBbji/sDLAVLyiQgJeq1Vfbmkk4uaDIrX0yurXau7unBHMZi5CaePCt9AmIZqvbK8N2BbO7WlSsSul2xsNv89bfGbrxb0vUL6zcVT0BMsjVXiDP82P1qNSbWbO+w2nm6uYslKQN18mr2fGvlJeUSkBL12ijLsWY8PZggW4zj23jycK6I1R5WANh3u3SkxJ9PbgnI5JJPXiFx2zcuqJVXI+uWdKo9X/f0uKixDUdLIupwFktAZpF9skqJ2X5GQW18sbbOW/pqH10Q2MQZJiRz4JDOWSwBmUX2SSq9hiS+PP9xQW13LtgzRbUHdoeGWgOrZlnaXdUrASm4eyouChTAASRW44s7J1CV2LMlsXfLYpxcy9Pj05bCXmUSEC8l6/LDis8/FzapNOaiJFsiTeejJmlFZ7UEZFb5QyoHjNIlUY+b89Tu5CprJ3n6set4VktAZpXfvXKPeQfnFjIx/2xB6zjx6QUF5V8r6W8KyrsVTUDcpJzdkce8g06ULqteUNL7jdGCvYgcB/eu2RXN7e41DIFbG9gG/g+F3ogW5JvJzwr8EPFXsiWeWJXDC+p3LbrUJ8ifSLqOJL4is7WaH1+CWRHhd1LUmXauozPcGdtI2E5SYkABHNZMI9SN3mQ8LDHa8I4SB55llwYIG9pIRsaxxmzQ28vOkPTq7isx792t2t9KeoVD4+9ZOG+gCfz1J2LRasc7rL5Z695YbimA8N5LIjMizsYak9GnSnrV2IIVXF8aANV3gQk1gJQY3zv47mE19lpx1uAXrQ4iyi0BEE5HJceS5XztVU0nzZbhMJh/UZi4rW+Cx7yDSD8iFdl3ZbXSHcPWevcs1zogZMYoCeJZF+eNBdk2QgZoD6e/dajQY95BM06UdIeC9hDGyxL1rwt8hBRtGRBvOHqB3yzptiFq+zi9kqSP+7j63WtVyfcKmlH6zQMfpdGKTnKc1U2rgETB0StU1VLjyrD9vaSXOt0NHvOOS3avVtbNiHSFNwAAqdJaBCQajn6gWAouWZHxHvAnSnqkk1M2It5GEhsCS4yFjbsUOOCVilerkkwpBdXvX7Q1QKaCo1eO/LPkoZ3bnivp3k6NIOkzcBBrUWIeT7PJsrRbO9oSIFPD0WsafpLqHoPH9hFehbz2JZGwmqXhM603TFeOVys+5lmjBHHDPIodv5PmuRrb71YAmQuOXk9uhpKw1bHjwvW8erB8XRLTsV7vpSWRHb3EztmlD2I7fImVZogvqXtw2RYAmRuOXkxeTUpviqEDw5Z14CiJBlyvi+AjTmYqNY89X6Qe9ZpPlfZnz/K1A1ILHL2IHDpjOTJs6CACBGCUBjut13dthz1S+HyspMcN7cyW69irhYbVffPY1N6aAakNjl4/UuiwEdLbIl6paCOrTK9xaKzHpJyPm8BRkh/YoSvDXdQKiDcc7HS9XZf8eLg6268kBSapML3sId1fZ89XKtpGv0v/4uOHTaCkLSV9aImR4YTl6masRkAi4OAmuUz3UYp9Qx7mcdISE3/2IEU8ke5fuHmw14gVK+CwZkXs/cy5Gmge79oAiYKjF8gbEmveKL48A4Y148d+A37Xbiv/ftft9+9eK1bs+eLVqtoPgtuEqAmQaDiiIGHQOTdjqJGpAzguPrTAyOs8l09fKQnYSo0EdtbE1aV1F5WvBZCp4IiC5KOSrrrPSHDj3qPgdKf9Bpoctnwh98oE8ixJvKaVWnVBUGM6VAMgU8MRBcm21y3AYNmW8zmijOMJODn2804VeITw0hQ+sNLvJpZ0N2k3NyBzwREFCdk8iMvGSDxAVvNDnG7abW7IoEjYbUn29VXf95H0HIc2ExkIHFVFCI7t15yAzA1HFCR8J7mQJLZ1RNvzutcgr7/Q5OL1+GZCe4CjmuQL1oGYC5Ba4IiCxDoeQ8sRv81E3ys2hHpLjodebzevlMw9mrc5AKkNjtYg4XsCcDDv8DIStXn9ta9+C/sY0aYGpFY4WoGEr9B8jfa00sM9V9tSdXSgRbQpAakdjpohYYs6T423WAZ5jzIe8eS9e74HAdssR6U56/L/7qYChPO1SYbgZV57jLa1x/uLe0m/T+jg+EaJkw1lySPmdbTZF7q9biUJr5275+NuCkAO6g5z4b8eFg1HLU8Sjh07RhIrVd52XHdyrIff70m6mWOmFY82ufmYAhCeHDxBPGwqOOaE5JfdtgzgiHhdeZExA+W28eOoBD6SLtKiATlCEmc9eNjUcMwBCbmC2bPklfdqXXdy+PJR0cvY8s/W/8VaNCAfknQ1B/XmgmMqSAggAgzS8UQYu3Jf3m1H8fJPjMi7vZzV6icSEP66vMeh43PDEQlJ5DyjbzfxHMxjPOPpyZ7PFpfFWyQgBCkRw1xitcDhDQmbCkm6xnwgYp7Rt5e/8sBRGuy0OoakIPJ6bS65NyYpGwkIG/dKUtbUBocHJDxRAYMfk/FII4YcOErDZFfbSGjwMyIbXZvvSEBIUmZd2q0VDiskZI0Hiqg5xvp95fH0XvfZXDy5B2yRgPzUmNepdjiGQkKYKRF5gMFixRTGZJynRulZhett3bknRy9AAlJ222764s7prLxeAsdXytyPKh0xGacBxIfwYXEnLRKQJb9ird4sQPLkbus5YEROurfdpMw3iAIsyZW7yTdH2pFJcWctEpClTtJrull4agBGyREE2/rjlXCuJr1GtyUSEI+JYivzkdHCOxRgJy5wlBxes6kZZFvnieS9c9ihy9O7iARkaR8Kpx+dzTWS+A4wSs4E3NaXr3VwNJMaNHpQIgGh7UvZahI9DkP9k2gOOEpOk91WF/EcpCX65NDG7MJ10YAsYbNiDfcB+9keIemwoMYQCchq1RwLDEFd8nEbDQitbHm7u4/Kdi/n6MDgLA3+P8IWFUPuLdAUgLQaMOWt9Vh/PC14anjsht5UN6l5eGosIvvIWHGHXj8FILSltZDbofpFXHeR7vQlVqmijGRuwOGVySSqnbP7nQoQOspZ2K9z7PESl4CBgtcpIIkyoACOpjMeRomz7ndKQKjbc9KOv6VAwusUX62jj5zmdQo4vDIxTnWfzlbP1IDQUeIJCC31spYh4VvGkZJu5CXGFj9snGR5uMkjCIK12dP9HIDQIM6cYDOfl7UGCds4ACPiZKl1TcnECBzNHV7jdXOU+JkLENp8ty5OuqT9q2VbgIRt6IBREkg2VC8OzDyqtTMBh3ZuquvmBIQ+epycWjskhLtysA2HiF5looHlqGWeGrllpFDwuQGh+fxFfXFhP2qDhI96QNH/DnDs336untTBkRPx/ZQa8O81AEIzObfvhQPaO/SSuV63OCwHKPjuYw03HtrH9evIpcVT4xSrgyx3VgVqAYSWscxJlg8vmwqSgyVxfABLtZzkOrUx13iapKMlsVU9zVGBmgChW63MSTjVFij4Heo4HmNdEbMBHF4Hd46tf/HX1wYIgpMakxSZXub1JOHpABB8s7iyV+OMfsiiDhieS+XGpiy7WI2AoLj3x8R/697PPzZwOM8j6UorPxI0eyZfG9iMs1xGLi3AeHq+TlklHFeuVkDoBccaczaGp7EQQBqer0r69opjll/Xf571evgiZgM4OJM9bSIFagYECbxPpZpIVtdqeOqRzdD7j4VrI5fqrHZA0J1l0zctdQD26BcTb74PeZ5ku4MylnW5BUDoIUuoby3rajOlyd8LGLwKps2sQCuAIBNbwU+aWa/I6snICBgnRlaSvscp0BIg9OymkliRWpKd2oHhecjpkvSZtS+tAYJYnofezyU+ib3J+M5vacDPpWlIvS0CghB8tDstRJFYp0y839CB8c3YqtK7hwKtAkLf2e7RwumqP1x5WrzTY9DSx3QKtAwIKp23W92aIjJv7KicvgLGd8cWzuvrUKB1QHoVj5V0v5kl/YUkJtyAwe9TM7cnq3dQYCmAIAV5ZflNFbVHnZyBcnI3HwIKJt9pC1JgSYD0wxIJys+75AdAwdPicwu6F7IrGxRYIiB9N9k2f3gX3WcZ/F91GwPJBsIGQX5nWBxlmXYVWDIg/aicv9v0yMbHAyVdWBKHXa4aWc05T5DU/4AAFDmHaPe+dmv5LgCySSygAZbfdGDk3MHtllqWo10FZFmjmL0JUyABCZM2HS9BgQRkCaOYfQhTIAEJkzYdL0GBBGQJo5h9CFMgAQmTNh0vQYEEZAmjmH0IUyABCZM2HS9BgQRkCaOYfQhTIAEJkzYdL0GBBGQJo5h9CFMgAQmTNh0vQYEEZAmjmH0IUyABCZM2HS9BgQRkCaOYfQhTIAEJkzYdL0GBBGQJo5h9CFMgAQmTNh0vQYEEZAmjmH0IUyABCZM2HS9BgQRkCaOYfQhT4P8AIjcX9vOCIu8AAAAASUVORK5CYII="
            />
          </a-card-meta>
        </a-card>
      </div>

      <div class="form-item">
        <a-card hoverable style="width: 300px">
          <template slot="actions" class="ant-card-actions">
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>绑定</span>
              </template>
              <a-icon key="paper-clip" type="paper-clip" />
            </a-tooltip>
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>修改</span>
              </template>
              <a-icon key="edit" type="edit" />
            </a-tooltip>
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>解绑</span>
              </template>
              <a-icon key="delete" type="delete" theme="twoTone" two-tone-color="#ff4d4f" />
            </a-tooltip>
          </template>
          <a-card-meta :title="formData.mail.label" :description="formData.mail.bind || formData.mail._bind">
            <a-avatar
              slot="avatar"
              src="data:image/png;base64,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"
            />
          </a-card-meta>
        </a-card>
      </div>

      <div class="form-item">
        <a-card hoverable style="width: 300px">
          <template slot="actions" class="ant-card-actions">
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>绑定</span>
              </template>
              <a-icon key="paper-clip" type="paper-clip" />
            </a-tooltip>
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>修改</span>
              </template>
              <a-icon key="edit" type="edit" />
            </a-tooltip>
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>解绑</span>
              </template>
              <a-icon key="delete" type="delete" theme="twoTone" two-tone-color="#ff4d4f" />
            </a-tooltip>
          </template>
          <a-card-meta :title="formData.mfa.label" :description="formData.mfa.bind || formData.mfa._bind">
            <a-avatar
              slot="avatar"
              src="data:image/png;base64,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"
            />
          </a-card-meta>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "safeSetting",
  data() {
    return {
      formData: {
        phone: {
          label: "手机",
          bind: this.$store.state.user.phone,
          _bind: "暂未绑定",
        },
        mail: {
          label: "邮箱",
          bind: this.$store.state.user.mail,
          _bind: "暂未绑定",
        },
        mfa: {
          label: "MFA",
          bind: this.$store.state.user.mfa,
          _bind: "暂未绑定",
        },
      },
    };
  },
};
</script>


<style scoped>
.form-container {
  padding-left: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.form-item {
  margin: 20px 10px;
}
h2 {
  padding-left: 20px;
  margin: 10px 0px 20px 0px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
}
</style>