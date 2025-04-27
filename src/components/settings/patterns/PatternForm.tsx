import React from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import { Pattern, CreatePatternInput } from '../../../types';

interface PatternFormProps {
  initialValues?: Pattern;
  onSubmit: (values: CreatePatternInput) => void;
  onCancel?: () => void;
}

export const PatternForm: React.FC<PatternFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm<CreatePatternInput>();

  const handleSubmit = (values: CreatePatternInput) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="name"
        label="Nom"
        rules={[{ required: true, message: 'Le nom est requis' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'La description est requise' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="confidence"
        label="Confiance (%)"
        rules={[
          { required: true, message: 'Le niveau de confiance est requis' },
          { type: 'number', min: 0, max: 100 },
        ]}
      >
        <InputNumber min={0} max={100} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          {onCancel && (
            <Button onClick={onCancel}>
              Annuler
            </Button>
          )}
          <Button type="primary" htmlType="submit">
            {initialValues ? 'Modifier' : 'Créer'}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}; 