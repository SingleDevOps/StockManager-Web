import { createClient } from '@supabase/supabase-js';
import { SUPABASE_API_KEY, SUPABASE_URL } from './API_Secret';

// Create a single supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

// Get data from Supabase public schema, 库存表 table

interface 入库数据{
    日期: string;
    货物编码: string;
    货物名称: string;
    尺码: string;
    数量: number;
    备注: string;
    颜色: string;
}

interface 出库数据{
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
        .select('*');  // Select all columns to get full record

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
    
    return data;
}

export async function 出库(数据: 出库数据){

    const { data, error } = await supabase
        .schema('public')
        .from('出库表')
        .insert([数据])  
        .select('*');  // Select all columns to get full record

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
    
    return data;
}

// 添加库存

export async function 添加库存(数据: 库存数据){
    const { data, error } = await supabase
    .schema('public')
    .from('库存表')
    .insert([数据])
    .select();
    if (error) {
      console.error('Error fetching stock data:', error);
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

