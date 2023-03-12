const BarAttrsOption: ChartOption = {
    label: '柱状图',
    value: 'bar',
    attrs: [
        {
            name: 'X轴',
            key: 'xAxis',
            formItems: [
                { 
                    label: '是否显示', 
                    key: 'show', 
                    type: 'radio' , 
                    options: [{ label: '显示', value: true }]
                },
                { 

                    label: '数据', 
                    key: 'data', 
                    type: 'form', 
                    props: { placeholder: '请输入要渲染的数据'},
                    children: [
                        {
                            label: '数据值', type: 'input', key: 'value'
                        }
                    ]

                },
                
            ]
        }
    ]
} 

export default BarAttrsOption