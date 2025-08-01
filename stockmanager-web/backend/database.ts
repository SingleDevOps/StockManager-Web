import { createClient } from '@supabase/supabase-js';
import { SUPABASE_API_KEY, SUPABASE_URL } from './API_Secret';

// Create a single supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

// Get data from Supabase public schema, 库存表 table

interface 入库数据{
    序号?:number;
    日期: string;
    货物编码: string;
    货物名称: string;
    尺码: string;
    数量: number;
    备注: string;
    颜色: string;
}

interface 出库数据{
    序号?:number;
    日期: string;
    货物名称: string;
    货物编码: string;
    尺码: string;
    数量: number;
    备注: string;
    颜色: string;
}

interface 库存数据{
    货物编码: string;
    货物种类: string;
    商标: string;
    颜色: string;
    尺码: string;
    初始库存: number;
    采购数量: number;
    销售数量: number;
    当前库存: number;
    货物名称: string;
}

interface 货物编码数据{
    货物编码: string;
    货物种类: string;
    商标: string;
    货物名称: string;
    颜色: string;
    尺码: string;
    数量: number;
}

interface 销售数据{
    货物名称: string;
    货物种类: string;
    销售数量: number;
    当前库存: number;
    销售额: number;
}

export async function 查看库存() {
  const { data, error } = await supabase
    .schema('public')
    .from('库存表')
    .select('*');
  if (error) {
    console.error('Error fetching stock data:', error);
  }
  return data;
}

export async function 查看入库() {
    const { data, error } = await supabase
      .schema('public')
      .from('入库表')
      .select('*');
    if (error) {
      console.error('Error fetching stock data:', error);
    }
    return data;
}

export async function 查看出库() {
  const { data, error } = await supabase
    .schema('public')
    .from('出库表')
    .select('*');
  if (error) {
    console.error('Error fetching stock data:', error);
  }
  return data;
}

//查看货物编码
export async function 查看货物编码() {
  const { data, error } = await supabase
    .schema('public')
    .from('货物编码表')
    .select('*');
  if (error) {
    console.error('Error fetching stock data:', error);
  }
  return data;
}

export async function 查看销售汇总(){
    const { data, error } = await supabase
    .schema('public')
    .from('销售汇总')
    .select('*');
    if (error) {
      console.error('Error fetching stock data:', error);
    }
    return data;
}

export async function 入库(数据: 入库数据){

    const { data, error } = await supabase
        .schema('public')
        .from('入库表')
        .insert([数据])  // Use array format for insert

    if (error) {
        // Log detailed error information for debugging
        console.error('Error adding stock-in data:', {
            error,
            errorMsg: error.message,
            details: error.details,
            hint: error.hint
        });
        throw new Error(`入库失败: ${error.message || '未知错误'}`);
    }
    try{
        await 增加库存(数据.货物编码, 数据.数量)
    } catch(error){
        throw new Error(`入库成功，但库存增加失败: ${error}`);
    }
}
export async function 出库(数据: 出库数据){

    const { data, error } = await supabase
        .schema('public')
        .from('出库表')
        .insert([数据])  

    if (error) {
        // Log detailed error information for debugging
        console.error('Error adding stock-out data:', {
            error,
            errorMsg: error.message,
            details: error.details,
            hint: error.hint
        });
        throw new Error(`出库失败: ${error.message || '未知错误'}`);
    }
    try{
        await 减少库存(数据.货物编码, 数据.数量)
    } catch(error){
        throw new Error(`出库成功，但库存减少失败: ${error}`);
    }
    return data;
}
export async function 查看特定货物库存(货物编码:string){
    //获得原有特定货物编码货物的 '当前库存'
    const {data, error} = await supabase
    .schema('public')
    .from('库存表')
    .select('"当前库存"')
    .eq('货物编码',货物编码)
    .single();

    if (error) {
        console.error('Error deleting stock-in record:', {
            error,
            errorMsg: error.message,
            details: error.details,
            hint: error.hint
        });
        throw new Error(`删除入库记录失败: ${error.message || '未知错误'}`);
    }
    return data.当前库存;
}
export async function 增加库存(货物编码: string, 数量: number){
    const 当前库存 = await 查看特定货物库存(货物编码);
    const 新库存 = 当前库存 + 数量;
    const {data, error} = await supabase
    .schema('public')
    .from('库存表')
    .update({
        当前库存: 新库存,
    })
    .eq('货物编码', 货物编码)
    

    if (error){
        throw new Error(`增加库存失败: ${error.message}`);
    }
    return data;
}

export async function 减少库存(货物编码: string, 数量: number) {
  const 当前库存 = await 查看特定货物库存(货物编码);
  const 新库存 = 当前库存 + (-1 * 数量);

  const { data, error } = await supabase
    .schema('public')
    .from('库存表')
    .update({
       当前库存: 新库存,
    })
    .eq('货物编码', 货物编码)

  if (error) {
    throw new Error(`减少库存失败: ${error.message}`);
  }

  return data;
}

export async function 删除入库记录(id: number) {
    // 先尝试使用序号字段删除
    let query = supabase
        .schema('public')
        .from('入库表')
        .delete()
        .eq('序号', id);

    let { data, error } = await query;

    // 如果使用序号字段删除失败，尝试使用id字段
    if (error) {
        query = supabase
            .schema('public')
            .from('入库表')
            .delete()
            .eq('序号', id);
        
        const result = await query;
        data = result.data;
        error = result.error;
    }

    if (error) {
        console.error('Error deleting stock-in record:', {
            error,
            errorMsg: error.message,
            details: error.details,
            hint: error.hint
        });
        throw new Error(`删除入库记录失败: ${error.message || '未知错误'}`);
    }
    
    return data;
}



export async function 删除出库记录(id: number) {
    // 先尝试使用序号字段删除
    let query = supabase
        .schema('public')
        .from('出库表')
        .delete()
        .eq('序号', id);

    let { data, error } = await query;

    // 如果使用序号字段删除失败，尝试使用id字段
    if (error) {
        query = supabase
            .schema('public')
            .from('出库表')
            .delete()
            .eq('序号', id);
        
        const result = await query;
        data = result.data;
        error = result.error;
    }

    if (error) {
        console.error('Error deleting stock-out record:', {
            error,
            errorMsg: error.message,
            details: error.details,
            hint: error.hint
        });
        throw new Error(`删除出库记录失败: ${error.message || '未知错误'}`);
    }
    
    return data;
}

// 添加库存

// export async function 添加库存(数据: 库存数据){
//     const { data, error } = await supabase
//     .schema('public')
//     .from('库存表')
//     .insert([数据])
//     .select();
//     if (error) {
//       console.error('Error fetching stock data:', error);
//     }
//     return data;
// }

export async function 删除库存记录(货物编码: string) {
    const { data, error } = await supabase
        .schema('public')
        .from('库存表')
        .delete()
        .eq('货物编码', 货物编码);  // Using 货物编码 as the identifier

    if (error) {
        console.error('Error deleting stock record:', {
            error,
            errorMsg: error.message,
            details: error.details,
            hint: error.hint
        });
        throw new Error(`删除库存记录失败: ${error.message || '未知错误'}`);
    }
    
    return data;
}

// 添加货物编码

export async function 添加货物编码(数据: 货物编码数据){
    const { data, error } = await supabase
    .schema('public')
    .from('货物编码表')
    .insert([数据])
    .select();
    if (error) {
      console.error('Error fetching stock data:', error);
    }
    return data;
}

export async function 删除货物编码(货物编码: string){
    const { data, error } = await supabase
    .schema('public')
    .from('货物编码表')
    .delete()
    .eq('货物编码', 货物编码)
    .select();
    if (error) {
      console.error('Error fetching stock data:', error);
    }
    return data;
}