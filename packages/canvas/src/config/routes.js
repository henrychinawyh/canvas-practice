import Clock from "../components/Clock"
import Draw from "../components/Draw"
import Lottery from "../components/Lottery"

const routes = [
    // 时钟
    {
        path:'/clock',
        title:'时钟',
        element:<Clock />
    },

    // 刮刮乐
    {
        path:'/lottery',
        title:'刮刮乐',
        element:<Lottery />
    },

    // 画板和保存
    {
        path:'/draw',
        title:'canvas画板',
        element:<Draw />
    },
]

export default routes