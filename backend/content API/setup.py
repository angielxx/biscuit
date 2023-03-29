## setup.py
from glob import glob
from os import read
from os.path import basename, splitext
from setuptools import find_packages, setup

setup(
    name='biscuit_contentAPI',
    version='0.1',
    author='randallkk',
    author_email='randallkk.sw@gmail.com',
    long_description=read('README.md'),
    #python_requires='>=3.6',
    #install_requires=['numpy'],
    #package_data={'mypkg': ['*/requirements.txt']}, # 아직 잘 모르겠음.
    #dependency_links = [], ## 최신 패키지를 설치하는 경우 
    description='content API for biscuit; crawl tech blogs, extract keywords and train a model',
    packages=find_packages(where='src'),
    package_dir={'': 'src'},
    py_modules=[splitext(basename(path))[0] for path in glob('src/*.py')],
)