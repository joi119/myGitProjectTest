<template>
  <ul class="pages">
    <li>
      <input placeholder="Your Id..." v-model="id" @keyup.enter="click">
    </li>
    <li class="chat page">
      <div class="chatArea">
        <ul class="messages"></ul>
      </div>
      <input class="inputMessage" placeholder="Type here..." v-model="socketData" @keyup.enter="clickButton"/>
    </li>
    <li v-for="item in messageList" :key="item.uid">
      {{item.uid}}:{{item.thing}}
    </li>
  </ul>
</template>

<script>
  //实时聊天逻辑：客户端向服务端发送消息，服务端接收消息再返回
    export default {
      name: "ChatRoom",
      data(){
        return {
          id: '',
          socketId:'',
          socketData:'',
          message:'',
          messageList:[]
        }
      },
      sockets:{
        //这里是监听connect事件
        connect(){
          // 获取每台客服端生成的id
          this.socketId = this.$socket.id;
          console.log('---链接服务器');
        },
        // 监听断开连接，函数
        disconnect(){
          console.log('断开服务器连接');
        },
        reconnect(){
          console.log("重新链接");
        },
        // 服务端指定有msg监听的客服端，可接收对应发来的消息
        getVal: function(val){     // getVal 名字自定义 与服务端的保持一致
          console.log('val')
          let msg = val;
          //let msg = JSON.parse(val);
          this.messageList.push({
            thing:msg,
            uid:this.id,
          });
        },
      },
      methods: {
        //自定义事件向服务端发消息
        clickButton () {
          let data = this.socketData;
          console.log(data);
          this.$socket.emit('emit_method', data);
          this.socketData='';
        },
        click(){
          let iiiid=this.id;
          console.log(iiiid);
          this.id='';
        }
      },
      //因为通过路由进当前页面sockets里的connect未被触发所以需在mounted里触发一次，在这里触发connect事件
      mounted() {
        console.log('加载中---')
        // this.$socket.emit('STREAM_STATUS', data)//“STREAM_STATUS”跟后端约定好的主题名
        this.$socket.emit('connect', { subscribe: true });
      }
    }
</script>
<style>
  ul{
    list-style: none;
  }
  .page {
    height: 100%;
    position: absolute;
    width: 100%;
  }
  /* Font */
  .messages {
    font-size: 150%;
  }

  .inputMessage {
    font-size: 100%;
  }

  /* Messages */

  .chatArea {
    height: 100%;
    padding-bottom: 60px;
  }

  .messages {
    height: 100%;
    margin: 0;
    overflow-y: scroll;
    padding: 10px 20px 10px 20px;
  }

  .message.typing .messageBody {
    color: gray;
  }

  /* Input */

  .inputMessage {
    border: 10px solid #000;
    bottom: 0;
    height: 60px;
    left: 0;
    outline: none;
    padding-left: 10px;
    position: absolute;
    right: 0;
    width: 100%;
  }

</style>
