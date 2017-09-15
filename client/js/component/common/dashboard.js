module.exports = new Vue({
    data: {
        height: window.innerHeight/1.8,
        width: window.innerWidth/3,
        angle: (2*Math.PI)/5
    },
    methods: {
        init: function(){
            var me = this;
            window.addEventListener("resize", function(){
                me.width = window.innerWidth/3;
            });
        }
    },
    computed: {
        innerStyle: function(){
            return (this.width > this.height ? this.height : this.width) * 0.20;
        },
        iconStyle: function(){
            return (this.width > this.height ? this.height : this.width) * 0.28;
        },
        translateClientX: function(){
            return (this.width > this.height ? this.height : this.width)/2 - this.iconStyle/2;
        },
        translateClientY: function(){
            return (this.width > this.height ? this.height : this.width) * 0.05;
        },
        h: function(){
            return (this.width > this.height ? this.height : this.width)/2 + this.translateClientY - this.iconStyle/2;
        },
        translateStoreX: function(){
            return this.translateClientX + (this.h*Math.sin(this.angle));//(this.width > this.height ? this.height : this.width)/2 + this.h*Math.sin(this.angle) - this.iconStyle/2;
        },
        translateStoreY: function(){
            return this.h * (1 - Math.cos(this.angle));// - this.iconStyle/2;
        },
        translateResourceX: function(){
            return this.translateClientX + (this.h*Math.cos((2 * this.angle) - Math.PI/2));
        },
        translateResourceY: function(){
            return (this.width > this.height ? this.height : this.width)/2 + (this.h * Math.sin((2 * this.angle) - Math.PI/2)) - this.iconStyle/2;
        },
        translateRouteX: function(){
            return 2*this.translateClientX - this.translateResourceX;
        },
        translateRouteY: function(){
            return (this.width > this.height ? this.height : this.width)/2 + (this.h * Math.sin((2 * this.angle) - Math.PI/2)) - this.iconStyle/2;
        },
        translateReportX: function(){
            return 2*this.translateClientX - this.translateStoreX;
        },
        translateReportY: function(){
            return this.h * (1 - Math.cos(this.angle));// - this.iconStyle/2;
        }
    }
});