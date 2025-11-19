import { useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { fData } from 'src/utils/format-number';

import Iconify from '../iconify';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  multiple?: boolean;
  helperText?: React.ReactNode;
  accept?: Record<string, string[]>;
  maxSize?: number;
  thumbnail?: boolean;
  sx?: any;
};

export default function RHFUpload({
  name,
  multiple = false,
  helperText,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
  },
  maxSize = 3145728, // 3MB
  thumbnail = true,
  sx,
}: Props) {
  const { control, setValue, watch } = useFormContext();

  const files = watch(name);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      if (multiple) {
        setValue(name, [...(files || []), ...newFiles], { shouldValidate: true });
      } else {
        setValue(name, newFiles[0] || null, { shouldValidate: true });
      }
    },
    [multiple, name, setValue, files]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    multiple,
    accept,
    maxSize,
  });

  const removeFile = (fileToRemove: File | string) => {
    if (multiple) {
      const filteredFiles = files.filter((file: File | string) => file !== fileToRemove);
      setValue(name, filteredFiles, { shouldValidate: true });
    } else {
      setValue(name, null, { shouldValidate: true });
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <Box sx={{ width: 1, ...sx }}>
          <Box
            {...getRootProps()}
            sx={{
              p: 3,
              outline: 'none',
              borderRadius: 2,
              cursor: 'pointer',
              overflow: 'hidden',
              position: 'relative',
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
              border: `1px dashed ${alpha('#919EAB', 0.32)}`,
              transition: (theme) =>
                theme.transitions.create(['opacity', 'padding'], {
                  duration: theme.transitions.duration.shorter,
                }),
              '&:hover': {
                opacity: 0.72,
              },
              ...(isDragActive && {
                opacity: 0.72,
              }),
              ...(isDragReject && {
                color: 'error.main',
                borderColor: 'error.light',
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
              }),
              ...(error && {
                color: 'error.main',
                borderColor: 'error.light',
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
              }),
            }}
          >
            <input {...getInputProps()} />

            <Stack spacing={2} alignItems="center" justifyContent="center" direction="row">
              <Iconify icon="eva:cloud-upload-fill" width={40} sx={{ color: 'text.secondary' }} />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  <Box component="span" sx={{ color: 'primary.main', textDecoration: 'underline' }}>
                    Зураг сонгох
                  </Box>{' '}
                  эсвэл энд чирж тавих
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: 'text.disabled', mt: 0.5, display: 'block' }}
                >
                  PNG, JPG, GIF хэлбэртэй, хамгийн ихдээ {fData(maxSize)}
                </Typography>
              </Box>
            </Stack>
          </Box>

          {thumbnail && files && (
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
              }}
            >
              {multiple
                ? files.map((file: File, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        position: 'relative',
                        width: 100,
                        height: 100,
                        borderRadius: 1.5,
                        overflow: 'hidden',
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Box
                        component="img"
                        alt={file.name}
                        src={(file as any).preview || URL.createObjectURL(file)}
                        sx={{
                          width: 1,
                          height: 1,
                          objectFit: 'cover',
                        }}
                      />
                      <Box
                        onClick={() => removeFile(file)}
                        sx={{
                          top: 4,
                          right: 4,
                          position: 'absolute',
                          borderRadius: '50%',
                          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
                          },
                        }}
                      >
                        <Iconify
                          icon="mingcute:close-line"
                          width={20}
                          sx={{ color: 'common.white' }}
                        />
                      </Box>
                    </Box>
                  ))
                : files && (
                    <Box
                      sx={{
                        position: 'relative',
                        width: 100,
                        height: 100,
                        borderRadius: 1.5,
                        overflow: 'hidden',
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Box
                        component="img"
                        alt={typeof files === 'string' ? 'Logo' : files.name}
                        src={
                          typeof files === 'string'
                            ? files
                            : (files as any).preview || URL.createObjectURL(files)
                        }
                        sx={{
                          width: 1,
                          height: 1,
                          objectFit: 'cover',
                        }}
                      />
                      <Box
                        onClick={() => removeFile(files)}
                        sx={{
                          top: 4,
                          right: 4,
                          position: 'absolute',
                          borderRadius: '50%',
                          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
                          },
                        }}
                      >
                        <Iconify
                          icon="mingcute:close-line"
                          width={20}
                          sx={{ color: 'common.white' }}
                        />
                      </Box>
                    </Box>
                  )}
            </Box>
          )}

          {helperText && !error && (
            <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'text.secondary' }}>
              {helperText}
            </Typography>
          )}

          {error && (
            <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'error.main' }}>
              {error?.message}
            </Typography>
          )}
        </Box>
      )}
    />
  );
}
