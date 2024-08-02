import React, { useState } from 'react';
import { Button, Checkbox, FormProps, GetProp, Input, message, Upload, UploadProps } from 'antd';
import { AiFillBackward } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useMutation, useQuery } from '@tanstack/react-query';
import instance from '@/configs/axios';
import { PlusOutlined } from '@ant-design/icons';

type FieldType = {
    name: string;
    price: number;
    description?: string;
    featured: boolean;
    countInStock?: number;
    category: string[];
    image?: string[];

};
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
// const normFile = (e: any) => {
//     if (Array.isArray(e)) {
//         return e;
//     }
//     return e?.fileList;
// };

const ProductAddPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [previewImage, setPreviewImage] = useState("");


    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: () => instance.get(`/categories`),
    });

    console.log(categories);

    const { mutate } = useMutation({
        mutationFn: async (formData: FieldType) => {
            try {
                return await instance.post(`/products`, formData);
            } catch (error) {
                throw new Error((error as any).message);
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: 'success',
                content: 'Thêm sản phẩm thành công!',
            });
            form.resetFields();
        },
        onError: (error) => {
            messageApi.open({
                type: 'error',
                content: error.message,
            });
        },
    });

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        mutate(values);
    };
    return (
        <div className="container mx-auto">
            {contextHolder}
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-xl">Thêm sản phẩm</h1>
                <Link to="/admin/products">
                    <Button type="primary" danger>
                        <AiFillBackward /> Quay lại
                    </Button>
                </Link>
            </div>
            <div className="grid grid-cols-[auto,300px]">
                <div>
                    <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Tên sản phẩm"
                            name="name"
                            rules={[{ required: true, message: 'Tên sản phẩm bắt buộc nhập!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Giá sản phẩm"
                            name="price"
                            rules={[{ required: true, message: 'Giá sản phẩm bắt buộc nhập!' }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item label="Mô tả sản phẩm" name="description">
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item name="featured" valuePropName="checked">
                            <Checkbox>Sản phẩm nổi bật</Checkbox>
                        </Form.Item>
                        <Form.Item label="Sản phẩm trong kho" name="countInStock">
                            <Input />
                        </Form.Item>
                        <div>
                            <Form.Item label="Danh mục sản phẩm" name="category">
                                <Checkbox.Group>
                                    {categories?.data && categories.data.map((category: any) => (
                                        <Checkbox key={category._id} value={category._id}>
                                            {category.name}
                                        </Checkbox>
                                    ))}
                                </Checkbox.Group>
                            </Form.Item>
                        </div>
                        <Form.Item>
                            <Button type="primary" danger htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ProductAddPage;
