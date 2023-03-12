
const handleHandlezXAxis = (props: Props, option: CommonObject) => {
    const { } = props
}

const handleHandlezYAxis = () => {

}

const handleSeries = () => {

}

const TodoPropsList: Array<string> = ['xAxis', 'yAxis', ]

const itemHandleMap = {
    xAxis: handleHandlezXAxis,
    yAxis: handleHandlezYAxis,
    series: handleSeries
}
const barOptionHanlde = (props: Props, option: CommonObject) => {
    const needToDoItems = Object.keys(props).filter(item => TodoPropsList.find(toDoItem => toDoItem === item) )
    needToDoItems.forEach(item => {
        //
    })
} 

export default {
    initOption: barOptionHanlde,
    expose: {

    }
}